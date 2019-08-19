'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parcels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'Users',
          key: 'id'
        }
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      weightmetric: {
        type: Sequelize.STRING
      },
      sentOn: {
        type: Sequelize.DATE
      },
      deliveredOn: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      fromAddress: {
        type: Sequelize.STRING
      },
      toAddress: {
        type: Sequelize.STRING
      },
      currentLocation: {
        type: Sequelize.STRING
      },
      itemname: {
        type: Sequelize.STRING
      },
      recipient: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parcels');
  }
};