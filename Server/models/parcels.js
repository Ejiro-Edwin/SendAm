'use strict';
module.exports = (sequelize, DataTypes) => {
  const parcels = sequelize.define('parcels', {
    placedBy: DataTypes.INTEGER,
    weight: DataTypes.DOUBLE,
    weightmetric: DataTypes.STRING,
    sentOn: DataTypes.DATE,
    deliveredOn: DataTypes.INTEGER,
    status: DataTypes.STRING,
    fromAddress: DataTypes.STRING,
    toAddress: DataTypes.STRING,
    currentLocation: DataTypes.STRING,
    itemname: DataTypes.STRING,
    recipient: DataTypes.STRING
  }, {});
  parcels.associate = function(models) {
    parcels.belongsTo(models.Users, {})
  };
  return parcels;
};