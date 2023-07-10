const db = require("../models");
const UserMerchantReview = db.UserMerchantReview;

/**
 * function create
 */
exports.create = (body) => {
    return UserMerchantReview.create(body).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error create UserMerchantReview : ", err);
    });
};

exports.like = (reviewid, isliked) => {
 
    return this.update(reviewid, {"isLiked" : !(isliked)}
    ).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error liking merchant : ", err);
    });
    
}

exports.findBy = (arrWhere) => {
    return UserMerchantReview.findOne({
        attributes: [
            'id',
            'isLiked'
        ],
        where: arrWhere
    }).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding Review Record : ", err);
    });
};

exports.findByPk = (id) => {
    return UserMerchantReview.findByPk(id, {
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
    return UserMerchantReview.findAll({
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
    return UserMerchantReview.findAndCountAll({
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
    return UserMerchantReview.update(body, {
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
    return UserMerchantReview.findAll({
        attributes: [
            'id',
            'name'
        ]
    }).catch((err) => {
        console.log(">> Error finding trxRedeemVoucher : ", err);
    });
};

exports.getreview = (id) => {
    return UserMerchantReview.findAll({
        where: {merchantId: id},
        attributes: [
            'id','userId','date','description','rating','isLiked','createdAt','updatedAt','redeemCount'
        ]
    }).catch((err) => {
        console.log(">> Error finding merchant : ", err);
    });
};