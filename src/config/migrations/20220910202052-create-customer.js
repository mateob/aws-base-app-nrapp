const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(utils.systemTable.CUSTOMER, {
      ...utils.defaultFields(Sequelize),
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      bithDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable(utils.systemTable.CUSTOMER);
  },
};
