'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalleVentas extends Model {
    static associate(models) {
      // Asociación con el modelo Telefono
      DetalleVentas.belongsTo(models.telefono, {
        foreignKey: 'idTelefono'
      });

      // Asociación con el modelo Recarga
      DetalleVentas.belongsTo(models.recarga, {
        foreignKey: 'idRecarga'
      });

      // Asociación con el modelo Residencia
      DetalleVentas.belongsTo(models.residencia, {
        foreignKey: 'idResidencia'
      });

      // Asociación con el modelo Venta
      DetalleVentas.belongsTo(models.venta, {
        foreignKey: 'idVenta'
      });
    }
  };

  DetalleVentas.init({
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
    tableName: 'detalle_ventas',
    timestamps: false 
  });

  return DetalleVentas;
};