const db = require("../models");
const Roles = db.role;
const Users = db.user;
checkDuplicateEmail = (req, res, next) => {
    // Email
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};
checkRolesExisted = (req, res, next) => {
    Roles.findByPk(req.body.role).then(result => {
        if (!result) {
            res.status(400).send({
                message: "Failed! Role does not exist!!"
            });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;
