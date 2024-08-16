'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class residenciales extends Model {
    static associate(models) {
      residenciales.hasMany(models.detalle_ventas, {
        foreignKey: 'idResidencia'
      });
    }
  }

  residenciales.init({
    idResidencia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombrePlan: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    televisores: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telefonoFijo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    velocidadInternet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'residenciales',
    tableName: 'residenciales',
    timestamps: false
  });

  return residenciales;
};