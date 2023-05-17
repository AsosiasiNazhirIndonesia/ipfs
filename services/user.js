const db = require("../models");
// const BcService = require("./blockchain");
const User = db.User;
const Referrals = db.Referrals;
// const Utils = require("../helpers/utils.helper");
const Email = require("../helpers/email.helper");
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL))
const crypto = require('crypto');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
/**
 * function create
 */

exports.create = async (body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    const res = await this.findByEmail(body.email);
    if (res !== null) {
        return null;
    }

    let result = await web3.eth.accounts.create();

    return User.create({
        name: body.name,
        email: body.email,
        password: body.password,
        referred_by: body.referred_by,            
        blockchain_public: result.address,
        blockchain_private: result.privateKey,
        my_referral_code: Math.floor(Math.random() * 1000000)
    }).then(result => {
        return result;
    }).catch((err) => {

        console.log(">> Error create user : ", err);
    });
};

exports.refer = (id, email) => {

    console.log('@@@@@@@@@@@@');
    console.log(id);
    console.log(email);
    return Referrals.create({
        userId: id,
        email: email,
    }).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error create referral : ", err);
    });
};

exports.checkAddress = (address) => {
    return web3.utils.isAddress(address);
};


exports.encrypt = (idAndEmail) => {
   
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(idAndEmail);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

exports.decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
 }

exports.checkAddress = (address) => {
    return web3.utils.isAddress(address);
};

exports.findByEmail = (email) => {
    return User.findOne({
        where: {
            email: email
        }
    }).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding user : ", err);
    });
};

exports.signin = (body) => {

    return User.findOne({
        attributes: [
            'id',
            'name',
            'email'
        ],
        where: {email: body.email, password: body.password}
    }
    ).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Login failed ", err);
    });
};

exports.findByPk = (id) => {
    return User.findByPk(id).then(result => {
        if (result === null) {
            return "Invalid";
        }
        return result
    }).catch((err) => {
        console.log(">> Error finding roles : ", err);
    });
};


/**
 * function find all
 */
exports.findAllBy = (pageSize, page, whereArr) => {
    return User.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding document : ", err);
    });
};

/**
 * function find all for pagination
 */
exports.pagination = (pageSize, page, whereArr) => {
    return User.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding document : ", err);
    });
};

/**
 * function update document
 */
exports.update = (id, body) => {
    return User.update(body, {
        where: {
            id: id
        }
    }).catch((err) => {
        console.log(">> Error update document type : ", err);
    });
};

/**
 * function find all for dropdown
 */
exports.reference = (whereArr) => {
    return User.findAll({
        where: whereArr,
        attributes: [
            'name',
            'id',
            'blockchain_public'
        ]
    }).catch((err) => {
        console.log(">> Error finding document type : ", err);
    });
};


exports.findById = (id) => {
    return User.findOne({
            // attributes: [
            //     'id',
            //     'name',
            //     'email',
            //     'blockchain_public'
            // ],
            where: {
                id: id
            }
        }
    ).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding document : ", err);
    });
};



exports.findBy = (whereArr) => {
    return User.findOne({
            attributes: [
                'id',
                'name',
                'email'
            ],
            where: whereArr
        }
    ).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding document : ", err);
    });
};

exports.findAllByNP = (whereArr) => {
    return User.findAll({
        attributes: [
            'id',
            'name',
            'email'
        ],
        where: whereArr,
    }).catch((err) => {
        console.log(">> Error finding document : ", err);
    });
};


exports.forgotPassword = async (mailto) => {

    var forgotUserId, forgotName, forgotCode;
    await this.findByEmail(mailto).then((forgotUser) => 
        {
            forgotUserId = forgotUser.id;
            forgotName = forgotUser.name;
            forgotCode = Math.floor(Math.random() * 1000000);
        }).then(() => {
            this.update(forgotUserId, {"forgot_password_code" : forgotCode})
        })

        await Email.sendEmail(mailto, forgotCode + ' - Reset Password Code', 'notif.html', {
        receiver_name: forgotName,
        url: ``,
        subject: `${forgotCode} - Reset Password Code`,
        message: 
            `To reset password, please input this code in PIJI App: ${forgotCode}.`
        })

};

exports.emailVerif = async (mailto) => {

    var verifUserId, verifName, verifCode;
    await this.findByEmail(mailto).then((verifUser) => 
        {
            verifUserId = verifUser.id;
            verifName = verifUser.name;
            verifCode = Math.floor(Math.random() * 1000000);
        }).then(() => {
            this.update(verifUserId, {"email_verif_code" : verifCode})
        })

        Email.sendEmail(mailto,  verifCode + ' - Email Verification Code', 'notif.html', {
        receiver_name: verifName,
        url: ``,
        subject: `${verifCode} - Email Verification Code`,
        message: 
            `To verify your email address, please input this code in PIJI App: ${verifCode}.`
    })

};

exports.emailVerifDone = async (mailto) => {

    var verifUserId, verifName;
    await this.findByEmail(mailto).then((verifUser) => 
        {
            verifUserId = verifUser.id;
            verifName = verifUser.name;
        }).then(() => {
            this.update(verifUserId, {"done_verified" : true})
        })

        Email.sendEmail(mailto,  'Email Verification Successful', 'notif.html', {
        receiver_name: verifName,
        url: ``,
        subject: `Email Verification Successful`,
        message: 
            `Your email has been verified successfully, Welcome to PIJI App!`
    })

};