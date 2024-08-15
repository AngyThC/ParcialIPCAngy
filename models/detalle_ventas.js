'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalleVentas extends Model {}

  DetalleVentas.init({
    idDetalle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    direccion: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(6, 2),
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
      allowNull: false,
      references: {
        model: 'telefonos',  // Tabla a la que hace referencia
        key: 'idTelefono'    // Columna en la tabla referenciada
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // Puedes cambiar por 'CASCADE' si prefieres que se elimine en cascada
    },
    idRecarga: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recargas',  // Tabla a la que hace referencia
        key: 'idRecarga'    // Columna en la tabla referenciada
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    idResidencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'residencias',  // Tabla a la que hace referencia
        key: 'idResidencia'    // Columna en la tabla referenciada
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    idVenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas',  // Tabla a la que hace referencia
        key: 'idVenta'    // Columna en la tabla referenciada
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'detalle_ventas',
    timestamps: false
  });

  return DetalleVentas;
};