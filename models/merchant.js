'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      Merchant.hasMany(models.UserMerchantReview);
    }
  }
  Merchant.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    alamat: DataTypes.STRING,
    desa_kelurahan: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kotamadya_kabupaten: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kodepos: DataTypes.STRING,
    banner: {
      type: DataTypes.STRING,
      get() {
        return process.env.URL+"file/"+this.getDataValue('banner');
      }
    },
    image: {
      type: DataTypes.STRING,
      get() {
        return process.env.URL+"file/"+this.getDataValue('image');
      }
    },
    rating: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};
