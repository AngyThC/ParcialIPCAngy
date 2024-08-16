'use strict';
const Sequelize = require('sequelize');
const db = require("../models");
const DETALLEVENTAS = db.detalle_ventas;

module.exports = {
    // Método para obtener todos los detalles de venta
    find(req, res) {
        DETALLEVENTAS.findAll()
        .then(detalles => {
            res.status(200).send(detalles);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener detalles de venta' });
        });
    },

    // Método para obtener un detalle de venta por su ID
    findById(req, res) {
        const id = req.params.idDetalle;
        DETALLEVENTAS.findByPk(id)
        .then(detalle => {
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de venta no encontrado' });
            }
            res.status(200).send(detalle);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al obtener detalle de venta' });
        });
    },

    // Método para crear un nuevo detalle de venta
    create(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            subtotal: datos.subtotal,
            fechaInicio: datos.fechaInicio,
            fechaFinal: datos.fechaFinal,
            idTelefono: datos.idTelefono,
            idRecarga: datos.idRecarga,
            idResidencia: datos.idResidencia,
            idVenta: datos.idVenta,
        };
    
        // Solo agregar 'direccion' si está presente en el body
        if (datos.direccion !== undefined) {
            datos_ingreso.direccion = datos.direccion;
        }
    
        DETALLEVENTAS.create(datos_ingreso)
        .then(detalle => {
            res.send(detalle);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar detalle de venta' });
        });
    },

    // Método para actualizar un detalle de venta por su ID
    update(req, res) {
        const datos = req.body;
        const id = req.params.idDetalle;

        const camposActualizados = {};

        if (datos.direccion !== undefined) camposActualizados.direccion = datos.direccion;
        if (datos.subtotal !== undefined) camposActualizados.subtotal = datos.subtotal;
        if (datos.fechaInicio !== undefined) camposActualizados.fechaInicio = datos.fechaInicio;
        if (datos.fechaFinal !== undefined) camposActualizados.fechaFinal = datos.fechaFinal;
        if (datos.idTelefono !== undefined) camposActualizados.idTelefono = datos.idTelefono;
        if (datos.idRecarga !== undefined) camposActualizados.idRecarga = datos.idRecarga;
        if (datos.idResidencia !== undefined) camposActualizados.idResidencia = datos.idResidencia;
        if (datos.idVenta !== undefined) camposActualizados.idVenta = datos.idVenta;

        return DETALLEVENTAS.update(
            camposActualizados,
            {
                where: { idDetalle: id }
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).json({ error: 'Detalle de venta no encontrado' });
            }
            res.status(200).json({ message: 'Detalle de venta actualizado correctamente' });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar detalle de venta' });
        });
    },

    // Método para eliminar un detalle de venta por su ID
    async delete(req, res) {
        const id = req.params.idDetalle; 
    
        try {
            const detalleventas = await DETALLEVENTAS.findByPk(id);
    
            if (!detalleventas) {
                return res.status(404).json({ error: 'Detalle de venta no encontrado' });
            }
    
            await detalleventas.destroy();
            return res.json({ message: 'Detalle de venta eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar detalle de venta:', error);
            return res.status(500).json({ error: 'Error al eliminar detalle de venta' });
        }
    }
};