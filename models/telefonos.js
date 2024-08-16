'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Telefonos extends Model {
    static associate(models) {
      // Asociación con el modelo DetalleVentas
      Telefonos.hasMany(models.detalle_ventas, {
        foreignKey: 'idTelefono'
      });
    }
  }

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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Telefonos',
    tableName: 'telefonos', // Nombre de la tabla en plural y minúscula
    timestamps: false
  });

  return Telefonos;
};