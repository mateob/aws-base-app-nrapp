const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(utils.systemTable.USER, [
      utils.newSeedEntity({
        name: 'Administrador',
        userName: 'admin@nrapp.com.br',
        password: '83592826eeba29a03a8070578e374861', // M@teo@2104
        internal: true,
        userGroupId: '2c013b57-6251-4f9e-bb96-c449ff3e85ed',
        userType: 'system',
      }),
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(utils.systemTable.USER, null, {});
  },
};
