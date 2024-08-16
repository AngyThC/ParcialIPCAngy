'use strict';
const Sequelize = require('sequelize');
const db = require("../models");
const RESIDENCIALES = db.residenciales;

module.exports = {
    async find(req, res) {
        try {
            // Consultar solo residenciales con estado = 1
            const residenciales = await RESIDENCIALES.findAll({
                where: { estado: 1 }
            });

            if (residenciales.length === 0) {
                return res.status(404).send({
                    message: 'No se encontraron residenciales con estado activo.'
                });
            }

            return res.status(200).send(residenciales);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos.'
            });
        }
    },

    async findById(req, res) {
        const id = req.params.idResidencia; 
        try {
            const residencial = await RESIDENCIALES.findByPk(id);

            if (!residencial) {
                return res.status(404).send({
                    message: 'Residencia no encontrada.'
                });
            }
            return res.status(200).send(residencial);
        } catch (error) {
            console.error('Error al intentar recuperar el registro:', error);
            return res.status(500).send({
                message: 'Ocurrió un error al intentar recuperar el registro.'
            });
        }
    },

    async findAllResidenciales(req, res) {
        try {
            // Consultar solo residenciales con estado = 1 y solo los atributos necesarios
            const residenciales = await RESIDENCIALES.findAll({
                attributes: ['idResidencia', 'nombrePlan'],
                where: { estado: 1 }
            });

            if (residenciales.length > 0) {
                return res.status(200).send(residenciales);
            } else {
                return res.status(404).send({
                    message: 'No se encontraron residenciales con estado activo.'
                });
            }
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos.'
            });
        }
    },

    async create(req, res) {
        const datos = req.body;
        const datos_ingreso = { 
            nombrePlan: datos.nombrePlan,
            precio: datos.precio,
            televisores: datos.televisores,
            telefonoFijo: datos.telefonoFijo,
            velocidadInternet: datos.velocidadInternet,
            estado: 1 // Se asigna un valor predeterminado de 1 al crear
        };

        try {
            const nuevaResidencial = await RESIDENCIALES.create(datos_ingreso);
            return res.status(201).send(nuevaResidencial);
        } catch (error) {
            console.error('Error al insertar residencia:', error);
            return res.status(500).json({ error: 'Error al insertar residencia' });
        }
    },

    async update(req, res) {
        const datos = req.body;
        const id = datos.idResidencia;

        const camposActualizados = {};

        if (datos.nombrePlan !== undefined) camposActualizados.nombrePlan = datos.nombrePlan;
        if (datos.precio !== undefined) camposActualizados.precio = datos.precio;
        if (datos.televisores !== undefined) camposActualizados.televisores = datos.televisores;
        if (datos.telefonoFijo !== undefined) camposActualizados.telefonoFijo = datos.telefonoFijo;
        if (datos.velocidadInternet !== undefined) camposActualizados.velocidadInternet = datos.velocidadInternet;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; // Permite actualizar el estado

        try {
            const [rowsUpdated] = await RESIDENCIALES.update(camposActualizados, {
                where: { idResidencia: id } 
            });

            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Residencia no encontrada' });
            }
            return res.status(200).send('El registro ha sido actualizado');
        } catch (error) {
            console.error('Error al actualizar:', error);
            return res.status(500).json({ error: 'Error al actualizar' });
        }
    },

    async delete(req, res) {
        const id = req.params.idResidencia; 

        try {
            const residencia = await RESIDENCIALES.findByPk(id);

            if (!residencia) {
                return res.status(404).json({ error: 'Residencia no encontrada' });
            }

            await residencia.destroy();
            return res.json({ message: 'Residencia eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar residencia:', error);
            return res.status(500).json({ error: 'Error al eliminar residencia' });
        }
    }
};
