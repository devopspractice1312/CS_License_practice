'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'licensekeys',
        'company_name',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'licensekeys',
        'expiry_date',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'licensekeys',
        'expiry_mode',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('licensekeys', 'company_name'),
      queryInterface.removeColumn('licensekeys', 'expiry_date'),
      queryInterface.removeColumn('licensekeys', 'expiry_mode'),
    ]);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
