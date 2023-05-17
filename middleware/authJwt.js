const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const crypto = require('crypto');
const service = require("../services");
const UserService = service.user;
verifyToken =  (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, async (err, decoded) =>  {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = null;
        req.publicKey = null;
        let user = await UserService.findById(decoded.id);
        if(user !== null){
            req.publicKey = user.blockchain_public;
            req.userId = user.id;
        }
        req.id = decoded.id;
        next();
    });
};

verifySecretKey = (req, res, next) => {
    let appCode = req.headers["apps-code"];
    let hash = crypto.createHash('md5').update('xcutionsociety').digest('hex');
    let buff = new Buffer.from(appCode, 'base64');
    let decode = buff.toString('ascii');
    if (!appCode) {
        return res.status(403).send({
            message: "No apps code provided!"
        });
    }
    if (decode === hash) {
        next();
    } else {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
};
const authJwt = {
    verifyToken: verifyToken,
    verifySecretKey: verifySecretKey
};
module.exports = authJwt;
