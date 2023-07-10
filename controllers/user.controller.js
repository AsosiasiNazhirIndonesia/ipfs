const service = require("../services");
const UserService = service.user;
const UserMerchantReview = service.usermerchantreview;
const BlockchainService = service.blockchain;

/**
 * function index GetAll
 */
exports.index = async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    let result = await UserService.pagination(pageSize, page);
    const totalPages = Math.ceil(result.count / pageSize);
    const currentPage = page ? +page : 0;
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result.rows,
        paging: {
            total: result.count,
            page: currentPage,
            pages: totalPages,
        }
    });
};

/**
 * function references GetAll
 */
exports.references = async (req, res) => {
    let result = await UserService.reference(1);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};


/**
 * function get by id
 */
exports.detail = async (req, res) => {
    let result = await UserService.findById(req.params.id);
    return res.status(200).send({
        message: result === null ? "no data found" : "success",
        data: result
    });
};

/**
 * function get by email
 */
 exports.checkEmail = async (req, res) => {
    let result = await UserService.findByEmail(req.params.email);
    return res.status(200).send({
        message: result === null ? "no data found" : "success",
        data: result
    });
};

/**
 * function forgot
 */
 exports.forgotPassword = async (req, res) => {
    
    console.log('##################');
    console.log(req.params.email);
    let result = await UserService.forgotPassword(req.params.email);
    return res.status(200).send({
        message: result === null ? "failed to send reset pwd email" : "success",
        data: result
    });
};

/**
 * function verif
 */
 exports.emailVerif = async (req, res) => {
    
    console.log('##################');
    console.log(req.params.email);
    let result = await UserService.emailVerif(req.params.email);
    return res.status(200).send({
        message: result === null ? "failed to verif email" : "success",
        data: result
    });
};

/**
 * function forgot
 */
 exports.emailVerifDone = async (req, res) => {
    
    console.log('##################');
    console.log(req.params.email);
    let result = await UserService.emailVerifDone(req.params.email);
    return res.status(200).send({
        message: result === null ? "failed to done verif email" : "success",
        data: result
    });
};
/**
 * function login
 */
 exports.signin = async (req, res) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let result = await UserService.signin(req.body);
    return res.status(200).send({
        message: result === null ? "no data found" : "success",
        data: result
    });
};


/**
 * function references GetAll
 */
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let result = await UserService.create(req.body, req.file);
    return res.status(200).send({
        message: result === null ? "email is already registered" : "success create user",
        data: result
    });
};

/**
 * function references GetAll
 */
 exports.refer = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let result = await UserService.refer(req.body.userId, req.body.email);
    return res.status(200).send({
        message: "success add referral",
        data: result
    });
};

/*
/**
 * function references GetAll
 */
 exports.checkAddress = async (req, res) => {
    // Validate request
    let result = await UserService.checkAddress(req.params.address);
    return res.status(200).send({
        message: "success verifying Address",
        data: result
    });
};

/**
 * function references encrypt
 */
 exports.encrypt = async (req, res) => {
    // Validate request
    let result = await UserService.encrypt(req.body.id + " " + req.body.email);
    return res.status(200).send({
        message: "success encrypt",
        data: result
    });
};

/**
 * function references decrypt
 */
 exports.decrypt = async (req, res) => {
    // Validate request
    let result = await UserService.decrypt(req.body);
    return res.status(200).send({
        message: "success decrypt",
        data: result
    });
};

/*
/**
 * function references GetAll
 */
 exports.checkAddress = async (req, res) => {
    // Validate request
    console.log('here');
    console.log(req.params.address);
    let result = await UserService.checkAddress(req.params.address);
    return res.status(200).send({
        message: "success verifying Address",
        data: result
    });
};

/*
 * function update
 */
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    let result = await UserService.update(req.params.id, req.body, req.file);
    return res.status(200).send({
        message: "success updated user id " + result
    });
};

/*
 * function updatescore
 */
exports.updatescore = async (req, res) => {
    console.log('######################');
    console.dir(req.body);

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    
    let result1 = await UserService.update(req.params.id, req.body, req.file);

    let currentUser = await UserService.findById(req.params.id);
    let to = currentUser.blockchain_public;

    let amount = 0;
    if (req.body.score1 !== undefined) { amount = req.body.score1 }
    if (req.body.score2 !== undefined) { amount = req.body.score2 }
    if (req.body.score3 !== undefined) { amount = req.body.score3 }
    if (req.body.score4 !== undefined) { amount = req.body.score4 }
    if (req.body.score5 !== undefined) { amount = req.body.score5 }
    if (req.body.score6 !== undefined) { amount = req.body.score6 }
    if (req.body.score7 !== undefined) { amount = req.body.score7 }
    if (req.body.score8 !== undefined) { amount = req.body.score8 }
    if (req.body.score9 !== undefined) { amount = req.body.score9 }
    if (req.body.score10 !== undefined) { amount = req.body.score10 }
    console.log('######################');
    console.log(to);
    console.log(amount);
    let result2 = await BlockchainService.reward(to,amount);
    if (result2 == undefined) {
        return res.status(400).send({
            message: "fail to send token!"
        });
    }
    
    console.log(result2.txHash);
    return res.status(200).send({
        message: "success update? " + result1 + " with tx hash:" + result2.txHash
    });
};

/*
 * function update
 */
exports.submitReview = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    let result = await UserService.submitreview(req.body);
    return res.status(200).send({
        message: "success submit review " + result
    });
};

/*
 * function update
 */
exports.like = async (req, res) => {

    let reviewRecord = await UserMerchantReview.findBy({userId: req.body.userid, merchantId: req.body.merchantid});
    console.dir(reviewRecord);
    let result = await UserMerchantReview.like(reviewRecord.id, reviewRecord.isLiked);
    return res.status(200).send({
        message: "success liked " + result
    });
};
