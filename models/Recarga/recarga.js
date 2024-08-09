'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recarga extends Model {
    static associations(models) {
      // Asociaciones
    }
  };
  
  Recarga.init({
    idRecarga: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    internet: {
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
    modelName: 'recargas', // Nombre del modelo en singular
    tableName: 'recargas', // Nombre de la tabla
    timestamps: false, // para no usar los created y updated
  });

  return Recarga;
};
