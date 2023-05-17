const db = require("../models");
const Voucher = db.Voucher;

/**
 * function create
 */
exports.create = (body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    return Voucher.create(body).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error create voucher : ", err);
    });
};


exports.findBy = (arrWhere) => {
    return Voucher.findOne({
        where: arrWhere
    }).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding voucher : ", err);
    });
};

exports.findByPk = (id) => {
    return Voucher.findByPk(id).then(result => {
        if (result === null) {
            return "Invalid";
        }
        return result
    }).catch((err) => {
        console.log(">> Error finding voucher : ", err);
    });
};


/**
 * function find all
 */
exports.findAllBy = (pageSize, page, whereArr) => {
    return Voucher.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding voucher : ", err);
    });
};

/**
 * function find all for pagination
 */
exports.pagination = (pageSize, page, whereArr) => {
    return Voucher.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding voucher : ", err);
    });
};

/**
 * function update voucher
 */
exports.update = (id, body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    return Voucher.update(body, {
        where: {
            id: id
        }
    }).catch((err) => {
        console.log(">> Error update voucher type : ", err);
    });
};

/**
 * function find all for dropdown
 */
exports.reference = () => {
    return Voucher.findAll({
        attributes: [
            'id',
            'name'
        ]
    }).catch((err) => {
        console.log(">> Error finding voucher : ", err);
    });
};

