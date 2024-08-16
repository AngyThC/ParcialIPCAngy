'use strict';
const Sequelize = require('sequelize');
const db = require("../models");
const DETALLEVENTAS = db.detalle_ventas;
const Recarga = db.Recarga;
const Residenciales = db.residenciales;
const Telefonos = db.Telefonos;
const Venta = db.ventas;

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
    async create(req, res) {
        let datos = req.body;
    
        try {
            let subtotal = 0;
    
            if (datos.idRecarga) {
                const recarga = await Recarga.findOne({ where: { idRecarga: datos.idRecarga } });
                if (recarga) subtotal = recarga.precio;
            }
    
            if (datos.idResidencia) {
                const residencia = await Residenciales.findOne({ where: { idResidencia: datos.idResidencia } });
                if (residencia) subtotal = residencia.precio;
            }
    
            if (datos.idTelefono) {
                const telefono = await Telefonos.findOne({ where: { idTelefono: datos.idTelefono } });
                if (telefono) subtotal = telefono.precio;
            }
    
            // Formatear las fechas si están presentes
            const fechaInicio = datos.fechaInicio ? new Date(datos.fechaInicio).toISOString().split('T')[0] : null;
            const fechaFinal = datos.fechaFinal ? new Date(datos.fechaFinal).toISOString().split('T')[0] : null;
    
            const datos_ingreso = { 
                direccion: datos.direccion || null,
                subtotal: subtotal,  // Asigna el subtotal calculado
                fechaInicio: fechaInicio, // Fecha formateada
                fechaFinal: fechaFinal,   // Fecha formateada
                idTelefono: datos.idTelefono || null,
                idRecarga: datos.idRecarga || null,
                idResidencia: datos.idResidencia || null,
                idVenta: datos.idVenta,
            };
    
            // Crear el detalle de venta
            const detalle = await DETALLEVENTAS.create(datos_ingreso);
    
            // Actualizar el total en la tabla ventas sumando los subtotales de todos los detalles de la misma venta
            const totalVenta = await DETALLEVENTAS.sum('subtotal', { where: { idVenta: datos.idVenta } });
            await Venta.update({ total: totalVenta }, { where: { idVenta: datos.idVenta } });
    
            res.send(detalle);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar detalle de venta' });
        }
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