'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const DETALLEVENTAS = db.detalle_ventas;

module.exports = {
    create (req, res) {
        let datos = req.body 
        const datos_ingreso = { 
            direccion: datos.direccion,
            subtotal: datos.subtotal,
            fechaInicio: datos.fechaInicio,
            fechaFinal: datos.fechaFinal,
            idTelefono: datos.idTelefono,
            idRecarga: datos.idRecarga,
            idResidencia: datos.idResidencia,
            idVenta: datos.idVenta,
        };

        DETALLEVENTAS.create(datos_ingreso)
        .then(detalle => {
            res.send(detalle);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar residencia' });
        });
    },

    async delete(req, res) {
        const id = req.params.idDetalle; 
    
        try {
            const detalleventas = await DETALLEVENTAS.findByPk(id);
    
            if (!detalleventas) {
                return res.status(404).json({ error: 'Detalle venta no encontrada' });
            }
    
            await detalleventas.destroy();
            return res.json({ message: 'Detalle venta eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar residencia:', error);
            return res.status(500).json({ error: 'Error al eliminar Detalle venta' });
        }
    }
    
};
