
const express = require('express');
const mapRoutes = require('express-routes-mapper');

const config = require('../../config/');
const database = require('../../config/database');

const beforeAction = async () => {
  const testapp = express();
  const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');

  testapp.use(express.json());

  testapp.use('/api', mappedOpenRoutes);
  await database.authenticate();
  await database.sync().then(() => console.log('Connection to the database has been established successfully'));

  return testapp;
};

const afterAction = async () => {
  await database.close();
};


module.exports = { beforeAction, afterAction };
