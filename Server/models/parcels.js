const Sequelize = require('sequelize');
const db = require('../config/db.js');

  const parcel = db.sequelize.define('parcels', {
    placedBy: Sequelize.INTEGER,
    weight: Sequelize.DOUBLE,
    weightmetric: Sequelize.STRING,
    sentOn: Sequelize.DATE,
    deliveredOn: Sequelize.INTEGER,
    status: Sequelize.STRING,
    fromAddress: Sequelize.STRING,
    toAddress: Sequelize.STRING,
    currentLocation: Sequelize.STRING,
    itemName: Sequelize.STRING,
    recipient: Sequelize.STRING
  }, {});
   parcel.associate = function(models) {
     parcel.belongsTo(models.Users, {})
   };
  module.exports = parcel;