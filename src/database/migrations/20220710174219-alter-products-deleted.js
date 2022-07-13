'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'deleted', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'deleted');
  }
};
