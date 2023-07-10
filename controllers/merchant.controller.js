const service = require("../services");
const MerchantService = service.merchant;
const UserMerchantReviewService = service.usermerchantreview;


/**
 * function index GetAll
 */
exports.index = async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    let result = await MerchantService.pagination(pageSize, page);
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
    let result = await MerchantService.reference(1);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

exports.searchName = async (req, res) => {
    let result = await MerchantService.searchname(req.params.keyword);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

exports.getReview = async (req, res) => {
    let result = await UserMerchantReviewService.getreview(req.params.id);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

exports.byUserId = async (req, res) => {
    let result = await MerchantService.byuserid(req.params.userid);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

exports.byCategory = async (req, res) => {
    let result = await MerchantService.bycategory(req.params.category);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

exports.byCity = async (req, res) => {
    let result = await MerchantService.bycity(req.params.kotamadya_kabupaten);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

exports.byProvince = async (req, res) => {
    let result = await MerchantService.byprovince(req.params.provinsi);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};

/**
 * function get by id
 */
exports.detail = async (req, res) => {
    let result = await MerchantService.findByPk(req.params.id);
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
    let result = await MerchantService.create(req.body, req.file);
    return res.status(200).send({
        message: "success create merchant",
        data: result
    });
};


/**
 * function update
 */
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    let result = await MerchantService.update(req.params.id, req.body, req.file);
    return res.status(200).send({
        message: "success updated merchant id " + result
    });
};

