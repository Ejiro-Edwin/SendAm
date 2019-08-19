module.exports = {
  development: {
    host: '127.0.0.1',
    database: 'SendIt',
    dialect: 'mysql',
    username: 'root',
    password: '',
    port: 3306
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  test: {
    url: process.env.DATABASE_URL || '',
    dialect: 'mysql'
  }
};