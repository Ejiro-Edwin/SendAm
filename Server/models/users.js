const Sequelize = require('sequelize')
const db = require('../config/db.js')

const User = db.sequelize.define('user', {
    email: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    othernames: Sequelize.STRING,
    username: Sequelize.STRING,
    registered: Sequelize.DATE,
    isAdmin: Sequelize.INTEGER,
    password: Sequelize.STRING
  }, {});
  module.exports = User;