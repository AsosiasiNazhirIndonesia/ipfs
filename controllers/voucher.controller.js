const service = require("../services");
const VoucherService = service.voucher;


/**
 * function index GetAll
 */
exports.index = async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    let result = await VoucherService.pagination(pageSize, page);
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
    let result = await VoucherService.reference(1);
    return res.status(200).send({
        message: result === null ? "no data" : "success",
        data: result
    });
};


/**
 * function get by id
 */
exports.detail = async (req, res) => {
    let result = await VoucherService.findByPk(req.params.id);
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
    let result = await VoucherService.create(req.body, req.file);
    return res.status(200).send({
        message: "success create voucher",
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
    let result = await VoucherService.update(req.params.id, req.body, req.file);
    return res.status(200).send({
        message: "success updated voucher id " + result
    });
};

