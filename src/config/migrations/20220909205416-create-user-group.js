const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(utils.systemTable.USER_GROUP, {
      ...utils.defaultFields(Sequelize),
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userGroupType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable(utils.systemTable.USER_GROUP);
  },
};
