const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(utils.systemTable.REFRESH_TOKEN, {
      ...utils.defaultFields(Sequelize),
      token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable(utils.systemTable.REFRESH_TOKEN);
  },
};
