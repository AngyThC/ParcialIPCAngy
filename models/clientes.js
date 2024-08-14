'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {};

  Clientes.init({
    idCliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dpi: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'clientes',
    timestamps: false // No incluir createdAt y updatedAt
  });

  return Clientes;
};