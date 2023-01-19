'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
		allowNull: false,
        type: Sequelize.STRING
      },
	  licencekey: {
		allowNull: false,
        type: Sequelize.STRING
      },
	  hardwareid: {
		allowNull: false,
        type: Sequelize.STRING
      },
	  macaddress: {
		allowNull: false,
        type: Sequelize.STRING
      },
	  licencetype: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};