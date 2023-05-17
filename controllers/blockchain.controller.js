const service = require("../services");
const BcService = service.blockchain;
const OdpService = service.odp;
const OdpWitelService = service.odpwitel;
const trxReportService = service.trxreportodp;
const UserService = service.user;
const Utils = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");

exports.getPortData = async (req, res) => {
    let result = await BcService.getPortData(req.params.id);
    console.log(result);
    res.status(200).send({
        message: result.data.message,
        data: result.data.data
    });
};


exports.insertPortData = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    if (req.publicKey === null) {
        return res.status(400).send({
            message: "blockchain address not found for this account. please create new wallet first",
            data: []
        });
    }

    let getOdp = await OdpService.findBy({name: req.body.name});
    if (getOdp === null) {
        return res.status(400).send({
            message: "Odp name not found",
            data: {}
        });
    }
    let getOdpWitel = await OdpWitelService.findBy({odpId: getOdp.id, port: req.body.port});
    // console.log(getOdpWitel.id);
    if (getOdpWitel !== null) {
        let dateNow = Utils.getDateNow(1) + getOdp.id + req.body.port;
        let getlastBa = await trxReportService.findBy({odpId: getOdpWitel.id});

        const datePast = new Date();
        datePast.setDate(datePast.getDate() - 1);
        let dateLast = Utils.getDateBc(Utils.dateTimeFormat(getlastBa === null ? datePast : getlastBa.iss_date), 1) + +getOdp.id + req.body.port;
        // let pdToday = await BcService.getPortData(dateNow);
        // let pdLast = await BcService.getPortData(dateLast);

        // console.log(pdLast);
        let inDataBc = {
            valins_id: req.id,
            odp_id: getOdpWitel.id,
            port_number: req.body.port,
            port_data: req.body.port_data,
            modified_date: Utils.getDateNow(1)
        };
        let result = await BcService.insertPortData(inDataBc);

        let needBa = 1;
        if (getlastBa.description === '' || getlastBa.description.includes('BT', 0) || getlastBa.description.includes('NONE', 0)) {
            needBa = 0;
            let sendToken = {
                to: req.publicKey,
                amount: 1
            }
            await BcService.reward(sendToken);
        }

        const date = new Date();
        date.setDate(date.getDate() + 3);  // Expired Date Tidak Upload BA 3 hari

        let inData = {
            iss_name: req.body.iss_name,
            iss_date: Utils.getDateNow(),
            userId: req.userId,
            odpId: getOdpWitel.id,
            description: req.body.port_data,
            needReport: needBa,
            transactionHash: result.message,
            expiredDate: needBa === 0 ? null : Utils.dateTimeFormat(date),
            statusPunish: 0
        };
        let resReport = await trxReportService.create(inData);

        return res.status(200).send({
            message: "success insert",
            data: resReport
        });
    }

    return res.status(400).send({
        message: "Odp not found",
        data: {}
    });
};

exports.newWallet = async (req, res) => {
    let result = await BcService.newWallet();
    console.log(result);
    if (result != null) {
        let password =  Utils.checkAttr(req.body, 'password', req.body.password);
        let newUser = {
            id: req.id,
            name: Utils.checkAttr(req.body, 'name', req.body.name),
            email: Utils.checkAttr(req.body, 'email', req.body.email),
            password: bcrypt.hashSync(password == null ? 'telkomjaya' : password, 8),
            blockchain_public: result.publicKey,
            blockchain_private: result.privateKey,
        }
        if (req.userId === null) {
            await UserService.create(newUser, req.file);
        } else {
            await UserService.update(req.userId, newUser);
        }
        return res.status(200).send({
            message: "success generate wallet",
            data: result
        });
    }
    return res.status(500).send({
        message: "error get data from server",
        data: result
    });
};


exports.reward = async (req, res) => {
    if (req.publicKey !== req.body.to) {
        return res.status(400).send({
            message: "blockchain address not match with this account.",
            data: []
        });
    }
    let result = await BcService.reward(req.body);

    return res.status(200).send({
        message: "successfully added points",
        data: result
    });
};

exports.balance = async (req, res) => {
    if (req.publicKey !== req.body.address) {
        return res.status(400).send({
            message: "blockchain address not match with this account.",
            data: []
        });
    }
    let result = await BcService.getBalance(req.body.address);

    return res.status(200).send({
        message: "success get balance",
        data: result
    });
};


exports.punish = async (req, res) => {
    if (req.publicKey !== req.body.from) {
        return res.status(400).send({
            message: "blockchain address not match with this account.",
            data: []
        });
    }
    let getBalance = await BcService.getBalance(req.body.from);
// console.log(getBalance);
    if ((getBalance.balance - req.body.amount) < 10) {
        return res.status(400).send({
            message: "not enough points.",
            data: []
        });
    }

    let result = await BcService.punishOrRedeem(req.body);

    return res.status(200).send({
        message: "success reedem points",
        data: result
    });
};


exports.uploadBA = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    if (req.files.picture == undefined) {
        return res.status(400).send({
            message: "Picture can not be empty"
        });
    }
    if (req.files.file == undefined) {
        return res.status(400).send({
            message: "File can not be empty"
        });
    }
    let resReport = await trxReportService.findBy({transactionHash: req.params.id});
    if (!resReport) {
        return res.status(400).send({
            message: "Transaction not found."
        });
    }

    const date = new Date();
    date.setDate(date.getDate() + 1);

    let inData = {
        picture_evidence: req.files.picture[0].filename,
        file: req.files.file[0].filename,
        needReport: 0,
    };

    let result = await trxReportService.update(resReport.id, inData);
    // Add token after upload BA
    if (result) {
        let sendToken = {
            to: req.publicKey,
            amount: 1
        }
        await BcService.reward(sendToken);
    }
    return res.status(200).send({
        message: "success upload report",
        data: result
    });

};
