'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
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
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
