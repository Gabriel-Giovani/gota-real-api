'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('banners', 'deleted', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('banners', 'deleted');
  }
};
