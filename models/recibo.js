'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recibo = sequelize.define('Recibo', {
      idPago: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pago',
            key: 'id'
        }
    },
    codigo: DataTypes.STRING,
    monto: DataTypes.FLOAT
  }, {});
  Recibo.associate = function(models) {
      Recibo.belongsTo(models.Pago, { foreignKey: 'idPago', targetKey: 'id'})
  };
  return Recibo;
};