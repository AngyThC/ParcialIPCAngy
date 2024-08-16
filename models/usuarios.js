'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      // Asociación con el modelo Empleados
      Usuarios.hasOne(models.empleados, {
        foreignKey: 'idUsuario'
      });
    }
  };

  Usuarios.init({
    idUsuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'usuarios',
    timestamps: false // No incluir createdAt y updatedAt
  });

  return Usuarios;
};
