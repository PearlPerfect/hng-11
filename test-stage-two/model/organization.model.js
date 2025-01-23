const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const Organization = sequelize.define('Organization', {
  orgId: {
    type: Sequelize.STRING,
    primaryKey: true, 
    defaultValue: Sequelize.UUIDV4, // Generate unique identifier
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Organization;
