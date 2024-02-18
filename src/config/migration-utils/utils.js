const uuid = require('uuid').v4;

const defaultFields = (Sequelize) => {
  return {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isBloqued: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE,
  };
};

exports.defaultFields = defaultFields;

const newSeedEntity = (data, id) => {
  return {
    id: id ?? uuid(),
    active: true,
    isBloqued: false,
    createdAt: new Date(),
    ...data,
  };
};

exports.newSeedEntity = newSeedEntity;

const systemTable = {
  REFRESH_TOKEN: 'RefreshToken',
  USER: 'User',
  CUSTOMER: 'Customer',
  USER_GROUP: 'UserGroup',
  USER_GROUP_TYPE: 'UserGroupType',
  USER_GROUP_SCOPE: 'UserGroupScope',
  ORDER: 'Order',
  ORDER_TYPE: 'OrderType',
  ORDER_ITEM: 'OrderItem',
  PASSWORD_HISTORY: 'PasswordHistory',
  CONTRACT: 'Contract',
  ANALYSIS: 'Analysis',
  ANALYSIS_CUSTOMER: 'AnalysisCustomer',
  ANALYSIS_VEHICLE: 'AnalysisVehicle',
  RESTRICTION: 'Restriction',
  DOCUMENTATION: 'Documentation',
  WORKFLOW: 'Workflow',
  VEHICLE: 'Vehicle',
};

const userGroupType = {
  ADMIN: 'Admin',
  SYSTEM: 'System',
  ANALYZER: 'Analyzer',
  CUSTOMER: 'Customer',
  MANAGER: 'Manager',
};

const systemTableRelation = {
  TOWNHOUSE_TO_CUSTOMER: 'TownhouseToCustomer',
};

exports.systemTable = systemTable;
exports.systemTableRelation = systemTableRelation;
exports.userGroupType = userGroupType;
