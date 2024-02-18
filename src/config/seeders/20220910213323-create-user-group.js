const utils = require('../migration-utils/utils');

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(utils.systemTable.USER_GROUP, [
      utils.newSeedEntity({
        name: 'Grupo Admin',
        description: 'Grupo de acessos Administrador',
        userGroupType: utils.userGroupType.ADMIN,
      }, '2c013b57-6251-4f9e-bb96-c449ff3e85ed'),
      utils.newSeedEntity({
        name: 'Grupo Analistas',
        description: 'Grupo de acessos para Analistas',
        userGroupType: utils.userGroupType.ANALYZER,
      }, 'b294cfe1-6a14-48c3-85fa-e0a338f68c72'),
      utils.newSeedEntity({
        name: 'Grupo Gerente',
        description: 'Grupo de acessos para Gerente',
        userGroupType: utils.userGroupType.MANAGER,
      }, '9199d2d2-25c2-419e-b0d8-20f6cb5f95a5'),
      utils.newSeedEntity({
        name: 'Grupo Operador',
        description: 'Grupo de acessos para Operador',
        userGroupType: utils.userGroupType.ANALYZER,
      }, '9836f276-dde2-456b-b865-a9be48eab48a'),
      utils.newSeedEntity({
        name: 'Grupo Motorista',
        description: 'Grupo de acessos para Motorista',
        userGroupType: utils.userGroupType.CUSTOMER,
      }, '9e67393e-be1f-4bcd-afaf-638411a0735b'),
      utils.newSeedEntity({
        name: 'Grupo Empresa',
        description: 'Grupo de acessos para Empresa',
        userGroupType: utils.userGroupType.CUSTOMER,
      }, 'cc1f5950-47bb-4f60-81c5-fd944c5b8480'),
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(utils.systemTable.USER_GROUP, null, {});
  },
};
