const config = require("../config/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const service = require("../services");
const UsersService = service.user;
const RolesService = service.role;
const OrgService = service.org;
// const BcService = service.blockchain;

exports.signin = async (req, res) => {
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({message: 'Missing Authorization Header'});
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    // console.log(credentials);
    // console.log(password);
    // console.log(email);

    let hash = crypto.createHash('md5').update('xcutionsociety').digest('hex');
    let buff = new Buffer.from(password, 'base64');
    let decode = buff.toString('ascii');
    // console.log(decode);
    // console.log(hash);

    let user = await UsersService.findById(email);

    if (decode !== hash) {
        const passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
    }
    console.log(user);
    const token = jwt.sign({
        id: email
    }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
        message: "success request token",
        data: {
            id: email,
            token: token,
            blockchain_address: user ? user.blockchain_public : '-'
        }
    });
};
