'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    category: DataTypes.STRING,
    role: DataTypes.STRING,
    description: DataTypes.STRING,
    menu: DataTypes.STRING,
    report: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: "roles",
  });
  return Role;
};