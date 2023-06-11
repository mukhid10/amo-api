'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init({
    code: DataTypes.INTEGER,
    confirmationCode: DataTypes.INTEGER,
    emailUser: DataTypes.STRING,
    created: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Otp',
    tableName: 'otps',
  });
  return Otp;
};