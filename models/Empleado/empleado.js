'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Empleados extends Model {
      static associate(models) {
        // Asociación con el modelo Usuarios
        Empleados.belongsTo(models.usuarios, {
          foreignKey: 'idUsuario',
          as: 'usuario'
        });
      }
    };
  
  Empleados.init({
    idEmpleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    salario: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    salarioTotal: {
        type: DataTypes.DECIMAL(6,2),
        allowNull: true
      },
    comision: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    dpi: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    fechaNacimiento: {
    type: DataTypes.DATE,
    allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'empleados', // Nombre del modelo definido
    tableName: 'empleados', // Nombre de la tabla
    timestamps: false, // para no usar los created y updated
  });

  return Empleados;
};
