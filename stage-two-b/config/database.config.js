const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST, // Replace with your Postgres host
  port: process.env.PORT, // Replace with your Postgres port
  //username: 'YOUR_USERNAME', // Replace with your Postgres username
  password: process.env.PASSWORD, // Replace with your Postgres password
  database: process.env.DATABASE, // Replace with your Postgres database name
});

module.exports = sequelize;
