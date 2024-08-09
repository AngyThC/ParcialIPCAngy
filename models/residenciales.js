'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class residenciales extends Model {
   
  };
  residenciales.init({
    idResidencia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    precio: {
        type: DataTypes.DECIMAL(6,2),
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
  }, {
    sequelize,
    modelName: 'residenciales',
    timestamps: false 
  });
  return residenciales;
};
