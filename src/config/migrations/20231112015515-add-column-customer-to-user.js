const utils = require('../migration-utils/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(utils.systemTable.USER, 'customerId', {
      type: Sequelize.DataTypes.UUID,
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn(utils.systemTable.USER, 'customerId');
  },
};
