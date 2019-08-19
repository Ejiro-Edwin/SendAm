const Sequelize = require('sequelize')
const db = require('../config/db.js')

module.exports = db.sequelize.define('user', {
    email: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    othernames: Sequelize.STRING,
    username: Sequelize.STRING,
    registered: Sequelize.DATE,
    isAdmin: Sequelize.INTEGER,
    password: Sequelize.STRING
  }, {});
