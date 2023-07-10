const db = require("../models");

const Sequelize = require("sequelize");
const Game = db.Game;

/**
 * function create
 */
exports.create = (body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    return Game.create(body).then(result => {
        return result;
    }).catch((err) => {
        console.log(">> Error create game : ", err);
    });
};


exports.findBy = (arrWhere) => {
    return Game.findOne({
        where: arrWhere
    }).then(result => {
        if (result === null) {
            return null;
        }
        return result;
    }).catch((err) => {
        console.log(">> Error finding game : ", err);
    });
};

exports.findByPk = (id) => {
    return Game.findByPk(id).then(result => {
        if (result === null) {
            return "Invalid";
        }
        return result
    }).catch((err) => {
        console.log(">> Error finding game : ", err);
    });
};


/**
 * function find all
 */
exports.findAllBy = (pageSize, page, whereArr) => {
    return Game.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding game : ", err);
    });
};

/**
 * function find all for pagination
 */
exports.pagination = (pageSize, page, whereArr) => {
    return Game.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: whereArr
    }).catch((err) => {
        console.log(">> Error finding game : ", err);
    });
};

/**
 * function update game
 */
exports.update = (id, body, file) => {
    body.picture = 'no_image.jpg';
    if (file !== undefined) {
        body.picture = file.filename;
    }
    return Game.update(body, {
        where: {
            id: id
        }
    }).catch((err) => {
        console.log(">> Error update game type : ", err);
    });
};

/**
 * function find all for dropdown
 */
exports.reference = (cat) => {
    if (cat=='all')
    {
        return Game.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('category')) ,'category'],'category'
            ]
        }).catch((err) => {
            console.log(">> Error return categories : ", err);
        });
    }
    else
    {
        return Game.findAll({
            attributes: [
                `id`, `name`, `category`, `description`, `banner`, `image`, `link`
            ],
            where: {category: cat}
        }).catch((err) => {
            console.log(">> Error finding game : ", err);
        });
    }
};

/**
 * function find all for dropdown
 */
 exports.getcategories = (cat) => {

};

