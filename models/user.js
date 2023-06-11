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
    qr: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    since: DataTypes.DATE,
    expired: DataTypes.DATE,
    birthday: DataTypes.DATE,
    image: DataTypes.STRING,
    signatureImage: DataTypes.STRING,
    statusApproval: DataTypes.BOOLEAN,
    nameApproval: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    gender: DataTypes.STRING,
    point: DataTypes.STRING,
    statusMember: DataTypes.STRING,
    discount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};