/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const utils = require('./utils');

const generateDefaultSeeds = (userGroupId) => {
  const access = ['select', 'create', 'update', 'remove'];
  const tempList = [];
  for (const value in utils.systemTable) {
    access.forEach((m) => tempList.push(utils.newSeedEntity({
      route: utils.systemTable[value],
      access: m,
      userGroupId,
    })));
  }

  return tempList;
};

exports.generateDefaultSeeds = generateDefaultSeeds;
