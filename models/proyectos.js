'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proyectos extends Model {
    static associate(models) {
      Proyectos.hasMany(models.empleados, {
        foreignKey: 'idProyecto'
      });
    }
  }

  Proyectos.init({
    idProyecto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    fechaInicio: {
      type: DataTypes.DATE
    },
    fechaFin: {
      type: DataTypes.DATE
    },
    porcentaje: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'proyectos',
    timestamps: false 
  });

  return Proyectos;
};
