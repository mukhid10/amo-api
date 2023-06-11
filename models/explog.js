'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Explog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Explog.init({
    qr: DataTypes.STRING,
    userid: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    since: DataTypes.DATE,
    expired: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Explog',
    tableName: 'explogs'
  });
  return Explog;
};