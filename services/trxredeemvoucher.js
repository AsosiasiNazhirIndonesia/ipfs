const db = require("../models");
const TrxRedeemVoucher = db.TrxRedeemVoucher;

/**
 * function create
 */
exports.create = (body, file) => {
    return TrxRedeemVoucher.create(body).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error create trxRedeemVoucher : ", err);
    });
};


exports.findBy = (arrWhere) => {
    return TrxRedeemVoucher.findOne({
        where: arrWhere,
        include: [{
            model: db.Voucher,
            attributes: ['id', 'name']
        }]
    }).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding trxRedeemVoucher : ", err);
    });
};

exports.findByPk = (id) => {
    return TrxRedeemVoucher.findByPk(id, {
        include: [{
            model: db.Voucher,
            attributes: ['id', 'name']
        }]
    }).then(result => {
        if (result === null) {
            return "Invalid";
        }
        return result
    }).catch((err) => {
        console.log(">> Error finding trxRedeemVoucher : ", err);
    });
};


/**
 * function find all
 */
exports.findAllBy = (pageSize, page, whereArr) => {
    return TrxRedeemVoucher.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr,
        include: [{
            model: db.Voucher,
            attributes: ['id', 'name']
        }]
    }).catch((err) => {
        console.log(">> Error finding trxRedeemVoucher : ", err);
    });
};

/**
 * function find all for pagination
 */
exports.pagination = (pageSize, page, whereArr) => {
    return TrxRedeemVoucher.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr,
        include: [{
            model: db.Voucher,
            attributes: ['id', 'name']
        }]
    }).catch((err) => {
        console.log(">> Error finding trxRedeemVoucher : ", err);
    });
};

/**
 * function update trxRedeemVoucher
 */
exports.update = (id, body) => {
    return TrxRedeemVoucher.update(body, {
        where: {
            id: id
        }
    }).catch((err) => {
        console.log(">> Error update trxRedeemVoucher type : ", err);
    });
};

/**
 * function find all for dropdown
 */
exports.reference = () => {
    return TrxRedeemVoucher.findAll({
        attributes: [
            'id',
            'name'
        ]
    }).catch((err) => {
        console.log(">> Error finding trxRedeemVoucher : ", err);
    });
};

