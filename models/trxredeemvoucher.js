'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrxRedeemVoucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrxRedeemVoucher.belongsTo(models.Voucher);
    }
  }
  TrxRedeemVoucher.init({
    userId: DataTypes.INTEGER,
    voucherId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    transactionHash: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TrxRedeemVoucher',
  });
  return TrxRedeemVoucher;
};
