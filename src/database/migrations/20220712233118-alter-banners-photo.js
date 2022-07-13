'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('banners', 'phto', 'photo');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('banners', 'photo', 'phto');
  }
};
