const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('kkaUAdJbRK', 'kkaUAdJbRK', 'bPOh86jri0', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, '', {
//   host: process.env.DATABASE || 'localhost',
//   dialect: 'mysql',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db