'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        picture: {
            type: DataTypes.STRING,
            get() {
                return process.env.URL + "file/" + this.getDataValue('picture');
            }
        },
        password: DataTypes.STRING,
        blockchain_public: DataTypes.STRING,
        blockchain_private: DataTypes.STRING,
        birthday: DataTypes.DATE,
        last_login: DataTypes.DATE,
        score1: DataTypes.BIGINT,
        score2: DataTypes.BIGINT,
        score3: DataTypes.BIGINT,
        score4: DataTypes.BIGINT,
        score5: DataTypes.BIGINT,
        score6: DataTypes.BIGINT,
        score7: DataTypes.BIGINT,
        score8: DataTypes.BIGINT,
        score9: DataTypes.BIGINT,
        score10: DataTypes.BIGINT,
        forgot_password_code: DataTypes.BIGINT,
        email_verif_code: DataTypes.BIGINT,
        done_referring: DataTypes.TINYINT,
        done_verified: DataTypes.TINYINT,
        my_referral_code: DataTypes.BIGINT,
        referred_by: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
