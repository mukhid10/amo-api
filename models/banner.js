'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banner.init({
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'banner',
    tableName: 'banners',
  });
  return banner;
};