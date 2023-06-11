'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewMember.init({
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    in: DataTypes.DATE,
    out: DataTypes.DATE,
    mode: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewMember',
    tableName: "newmembers",
  });
  return NewMember;
};