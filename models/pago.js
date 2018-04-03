'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pago = sequelize.define('Pago', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: DataTypes.STRING,
    saldo: DataTypes.FLOAT
  }, {});
  Pago.associate = function(models) {
    // associations can be defined here
  };
  return Pago;
};