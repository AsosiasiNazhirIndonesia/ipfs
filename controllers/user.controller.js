const service = require("../services");
const UserService = service.user;


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

