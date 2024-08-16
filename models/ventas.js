'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    static associate(models) {
      // Asociación con el modelo Clientes
      Ventas.belongsTo(models.clientes, {
        foreignKey: 'idCliente'
      });

      // Asociación con el modelo Empleados
      Ventas.belongsTo(models.empleados, {
        foreignKey: 'idEmpleado'
      });

      // Asociación con el modelo DetalleVentas
      Ventas.hasMany(models.detalle_ventas, {
        foreignKey: 'idVenta'
      });
    }
  };
  
  Ventas.init({
    idVenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ventas', // Nombre del modelo definido
    tableName: 'ventas', // Nombre de la tabla
    timestamps: false, // para no usar los created y updated
  });

  return Ventas;
};