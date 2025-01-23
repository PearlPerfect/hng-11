const Sequelize = require('sequelize');
const sequelize = require('./db');

const UserOrganization = sequelize.define('UserOrganization', {
});

UserOrganization.belongsTo(User);
UserOrganization.belongsTo(Organization);

module.exports = UserOrganization;
