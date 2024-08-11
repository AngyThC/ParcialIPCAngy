'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Telefonos extends Model {}

  Telefonos.init({
    idTelefono: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    especificaciones: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Telefonos',
    timestamps: false
  });

  return Telefonos;
};
