'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_ventas extends Model {
   
  };
  detalle_ventas.init({
    idDetalle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
    subtotal: {
        type: DataTypes.DECIMAL(6,2),
        allowNull: false
      },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
      },
    fechaFinal: {
        type: DataTypes.DATE,
        allowNull: false
      },
    idTelefono: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    idRecarga: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    idResidencia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    idVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'detalle_ventas',
    timestamps: false 
  });
  return detalle_ventas;
};
