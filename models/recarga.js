'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recarga extends Model {
    static associate(models) {
      // Asociación con el modelo DetalleVentas
      Recarga.hasMany(models.detalle_ventas, {
        foreignKey: 'idRecarga'
      });
    }
  }
  
  Recarga.init({
    idRecarga: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    internet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minutosLlamada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aplicaciones: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Recarga',
    tableName: 'recargas',
    timestamps: false
  });

  return Recarga;
};