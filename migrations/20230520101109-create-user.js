'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qr: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      since: {
        type: Sequelize.DATE
      },
      expired: {
        type: Sequelize.DATE
      },
      birthday: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
      },
      signatureImage: {
        type: Sequelize.STRING
      },
      statusApproval: {
        type: Sequelize.BOOLEAN
      },
      nameApproval: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      gender: {
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.STRING
      },
      statusMember: {
        type: Sequelize.STRING
      },
      discount: {
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
    await queryInterface.dropTable('Users');
  }
};