'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checkins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      in: {
        type: Sequelize.DATE
      },
      out: {
        type: Sequelize.DATE
      },
      mode: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Checkins');
  }
};