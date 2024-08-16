'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empleados extends Model {
    static associate(models) {
      Empleados.belongsTo(models.proyectos, {
        foreignKey: 'idProyecto'
      });
    }
  }

  Empleados.init({
    idEmpleado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fechaNacimiento: {
      type: DataTypes.DATE
    },
    tipoTrabajo: {
      type: DataTypes.STRING(100)
    },
    estado: {
      type: DataTypes.STRING(50)
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      references: {
        model: 'proyectos', 
        key: 'idProyecto'
      }
    }
  }, {
    sequelize,
    modelName: 'empleados',
    timestamps: false 
  });

  return Empleados;
};
