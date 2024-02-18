const utils = require('../migration-utils/utils');
const routeGenerate = require('../migration-utils/router-generate-seeds');

module.exports = {
  async up(queryInterface, _Sequelize) {
    // ADMIN
    await queryInterface.bulkInsert(
      utils.systemTable.USER_GROUP_SCOPE,
      routeGenerate.generateDefaultSeeds('2c013b57-6251-4f9e-bb96-c449ff3e85ed'),
      {},
    );
    // Analista
    const userGroupId = 'b294cfe1-6a14-48c3-85fa-e0a338f68c72';
    await queryInterface.bulkInsert(
      utils.systemTable.USER_GROUP_SCOPE,
      [
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'select', userGroupId }, 'c6a70f2d-1204-40dd-b03c-b15d39de0468'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'update', userGroupId }, 'e4c0aebf-c008-4fb8-84c8-efa603b0f646'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'select', userGroupId }, 'bcb15c53-d3fd-46f0-9b6d-02bc53e84b9d'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'update', userGroupId }, '9051d31e-37eb-4965-b542-a44980554225'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'select', userGroupId }, '13402294-8ebd-4094-9780-e96f93eb9543'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'update', userGroupId }, '7a3eba91-7d4b-46c7-bd5c-9f863d99da25'),
      ],
      {},
    );

    const userGroupIdManager = '9199d2d2-25c2-419e-b0d8-20f6cb5f95a5';
    // Gerente
    await queryInterface.bulkInsert(
      utils.systemTable.USER_GROUP_SCOPE,
      [
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'select', userGroupId: userGroupIdManager }, 'fae8296b-960a-458e-b0ac-78a960d213d3'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'create', userGroupId: userGroupIdManager }, 'd187353c-9ee7-4eef-b773-ec8deef807ee'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'select', userGroupId: userGroupIdManager }, '237ad6aa-f0eb-478a-9ebe-754747c93292'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'create', userGroupId: userGroupIdManager }, 'f167094a-e55e-41c5-813b-fa0256084243'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'update', userGroupId: userGroupIdManager }, 'b7ebc454-7daa-4980-9546-9a4471482a63'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'select', userGroupId: userGroupIdManager }, '79fa7e0e-02b8-4a3f-9dcb-bded8d1a06ca'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'create', userGroupId: userGroupIdManager }, 'f53c7066-dd4a-47c7-9127-280bdb987c34'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'update', userGroupId: userGroupIdManager }, '2d3a98c1-f500-40ee-8de7-2c14a3ffa34e'),
      ],
      {},
    );

    const userGroupIdOperator = '9836f276-dde2-456b-b865-a9be48eab48a';
    // Operador
    await queryInterface.bulkInsert(
      utils.systemTable.USER_GROUP_SCOPE,
      [
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'select', userGroupId: userGroupIdOperator }, '7640463e-9e8a-4ef0-99b1-b788120708fe'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'create', userGroupId: userGroupIdOperator }, '2c7d79a6-6fc2-499a-8953-44061a3428f0'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'update', userGroupId: userGroupIdOperator }, 'bf2f7492-0098-46b9-87c8-c51fcf45f833'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'select', userGroupId: userGroupIdOperator }, '1f36d22f-4b51-4fc8-bcff-e20cb6807fc4'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'create', userGroupId: userGroupIdOperator }, '552db538-5a55-4a15-affe-f0ce064a34d1'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'update', userGroupId: userGroupIdOperator }, 'd88d4e67-baf9-4247-b098-15dec32563dd'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'select', userGroupId: userGroupIdOperator }, '380814a3-4a8e-437c-949a-fd9c9a99cd32'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'create', userGroupId: userGroupIdOperator }, 'c438e41c-f99b-479a-8956-e8dd8f7e5231'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'update', userGroupId: userGroupIdOperator }, '6fafd64f-7f0e-42ee-9c0e-362ea9fcadfd'),
      ],
      {},
    );

    const userGroupIdDriver = '9e67393e-be1f-4bcd-afaf-638411a0735b';
    // Motorista
    await queryInterface.bulkInsert(
      utils.systemTable.USER_GROUP_SCOPE,
      [
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'select', userGroupId: userGroupIdDriver }, '915c9cdf-7951-4690-8704-3c316b9a4b30'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'create', userGroupId: userGroupIdDriver }, 'efdb63f4-878e-4afe-8e17-efa33b565de2'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'select', userGroupId: userGroupIdDriver }, '4704740c-c1ff-4a64-a5c9-ce04d403aa6d'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'create', userGroupId: userGroupIdDriver }, '1e918e9b-ce04-434f-bc56-f0cc3e509f4a'),
      ],
      {},
    );

    const userGroupIdCompany = 'cc1f5950-47bb-4f60-81c5-fd944c5b8480';
    // Empresa
    await queryInterface.bulkInsert(
      utils.systemTable.USER_GROUP_SCOPE,
      [
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'select', userGroupId: userGroupIdCompany }, '0d273fff-9cef-428e-b5d8-fdbf06d08422'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS, access: 'create', userGroupId: userGroupIdCompany }, '43d2242b-24ba-4d66-adf0-67ffe2599e71'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'select', userGroupId: userGroupIdCompany }, '4ab40a5f-504d-44ed-abc3-c123431db03e'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'create', userGroupId: userGroupIdCompany }, '4ab9da95-2f53-479f-90de-de57a5a5e6e6'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_CUSTOMER, access: 'update', userGroupId: userGroupIdCompany }, 'b82b5961-282d-4660-af16-cce50ac52187'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'select', userGroupId: userGroupIdCompany }, '3d4ab160-2f8b-4624-94d3-1be20c870455'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'create', userGroupId: userGroupIdCompany }, 'c266e9ec-bfae-4f93-b107-61d8613713bf'),
        utils.newSeedEntity({ route: utils.systemTable.ANALYSIS_VEHICLE, access: 'update', userGroupId: userGroupIdCompany }, '5697da27-ca11-4f28-97ad-2f9427be7266'),
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(utils.systemTable.USER_GROUP_SCOPE, null, {});
  },
};
