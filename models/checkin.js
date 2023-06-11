'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checkin.init({
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    in: DataTypes.DATE,
    out: DataTypes.DATE,
    mode: DataTypes.STRING,
    notes: DataTypes.STRING,
    key: DataTypes.INTEGER,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Checkin',
    tableName: 'checkins'
  });
  return Checkin;
};