'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMerchantReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserMerchantReview.belongsTo(models.Merchant);
    }
  }
  UserMerchantReview.init({
    userId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    isLiked: DataTypes.INTEGER,
    redeemCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserMerchantReview',
  });
  return UserMerchantReview;
};
