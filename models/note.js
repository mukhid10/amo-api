'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Note.init({
    userId: DataTypes.INTEGER,
    staffName: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    catatan: DataTypes.STRING,
    lastScan: DataTypes.DATE,
    visit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Note',
    tableName: "notes",
  });
  return Note;
};