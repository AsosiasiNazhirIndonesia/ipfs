const db = require("../models");
const Merchant = db.Merchant;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
/**
 * function create
 */
exports.create = (body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    return Merchant.create(body).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error create merchant : ", err);
    });
};


exports.findBy = (arrWhere) => {
    return Merchant.findOne({
        where: arrWhere
    }).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

exports.findByPk = (id) => {
    return Merchant.findByPk(id).then(result => {
        if (result === null) {
            return "Invalid";
        }
        return result
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};


/**
 * function find all
 */
exports.findAllBy = (pageSize, page, whereArr) => {
    return Merchant.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

/**
 * function find all for pagination
 */
exports.pagination = (pageSize, page, whereArr) => {
    return Merchant.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

/**
 * function update merchant
 */
exports.update = (id, body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    return Merchant.update(body, {
        where: {
            id: id
        }
    }).catch((err) => {
        console.log(">> Error update merchant type : ", err);
    });
};

/**
 * function find all for dropdown
 */
exports.reference = (whereArr) => {
    return Merchant.findAll({
        where: whereArr,
        attributes: [
            'id','category','name','description','alamat','desa_kelurahan','kecamatan','kotamadya_kabupaten','provinsi','kodepos','banner','image','rating'
        ]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

exports.searchname = (keyword) => {
    return Merchant.findAll({
        where: {name: { [Op.substring]: keyword }},
        attributes: [
            'id','category','name','description','alamat','desa_kelurahan','kecamatan','kotamadya_kabupaten','provinsi','kodepos','banner','image','rating'
        ]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

exports.byuserid = (userid) => {
    return Merchant.findAll({
        attributes: [
            'id','category','name','description','alamat','desa_kelurahan','kecamatan','kotamadya_kabupaten','provinsi','kodepos','banner','image','rating'
        ],
        include: [{
            model: db.UserMerchantReview,
            where: {userId: userid},   
            required: false,
            attributes: ['isLiked'],
        }]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

exports.bycategory = (category) => {
    return Merchant.findAll({   
        where: {category: category},
        attributes: [
            'id','category','name','description','alamat','desa_kelurahan','kecamatan','kotamadya_kabupaten','provinsi','kodepos','banner','image','rating'
        ]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

exports.bycity = (city) => {
    return Merchant.findAll({
        where: {kotamadya_kabupaten: city},
        attributes: [
            'id','category','name','description','alamat','desa_kelurahan','kecamatan','kotamadya_kabupaten','provinsi','kodepos','banner','image','rating'
        ]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};

exports.byprovince = (province) => {
    return Merchant.findAll({
        where: {provinsi: province},
        attributes: [
            'id','category','name','description','alamat','desa_kelurahan','kecamatan','kotamadya_kabupaten','provinsi','kodepos','banner','image','rating'
        ]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};