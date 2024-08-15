const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalleVentas extends Model {
    static associate(models) {
      DetalleVentas.belongsTo(models.residenciales, {
        foreignKey: 'idResidencia'
      });
      DetalleVentas.belongsTo(models.Telefonos, {
        foreignKey: 'idTelefono'
      });
      DetalleVentas.belongsTo(models.Recarga, {
        foreignKey: 'idRecarga'
      });
      DetalleVentas.belongsTo(models.ventas, {
        foreignKey: 'idVenta'
      });
    }
  }

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
    }
  }, {
    sequelize,
    modelName: 'detalle_ventas',
    timestamps: false
  });

  return DetalleVentas;
};
