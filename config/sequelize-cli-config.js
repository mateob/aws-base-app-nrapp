/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'local';
const filePath = path.join(__dirname, `env.${env}.json`);
if (!fs.existsSync(filePath)) {
  console.log(`Invalid Environment - "${filePath}" not found`);
  return;
}

const { databaseConnectionString } = require(filePath);

console.log(`[env: ${env}] - ${databaseConnectionString}`);
const [dialect] = databaseConnectionString.split('://');

module.exports = { dialect, url: databaseConnectionString };
