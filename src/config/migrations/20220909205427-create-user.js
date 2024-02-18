const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(utils.systemTable.USER, {
      ...utils.defaultFields(Sequelize),
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      internal: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userGroupId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: utils.systemTable.USER_GROUP, key: 'id' },
      },
      userType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable(utils.systemTable.USER);
  },
};
