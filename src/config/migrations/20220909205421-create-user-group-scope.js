const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(utils.systemTable.USER_GROUP_SCOPE, {
      ...utils.defaultFields(Sequelize),
      route: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      access: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userGroupId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: utils.systemTable.USER_GROUP, key: 'id' },
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable(utils.systemTable.USER_GROUP_SCOPE);
  },
};
