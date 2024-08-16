'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
      static associate(models) {
          // Asociación con el modelo Ventas
          Clientes.hasMany(models.ventas, {
              foreignKey: 'idCliente'
          });
      }
  };

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
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'clientes',
    timestamps: false // No incluir createdAt y updatedAt
  });

  return Clientes;
};