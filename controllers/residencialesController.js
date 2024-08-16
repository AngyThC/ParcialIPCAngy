'use strict';
const Sequelize = require('sequelize');
const db = require("../models");
const RESIDENCIALES = db.residenciales;

module.exports = {
    find(req, res) {
        return RESIDENCIALES.findAll()
            .then(residenciales => {
                // Desencriptar contraseñas si fuera necesario, pero en este caso no hay contraseñas
                return res.status(200).send(residenciales);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.idResidencia; 
        return RESIDENCIALES.findByPk(id)
            .then(residencial => {
                if (!residencial) {
                    return res.status(404).send({
                        message: 'Residencia no encontrada.'
                    });
                }
                return res.status(200).send(residencial);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    findAllResidenciales(req, res) {
        return RESIDENCIALES.findAll({
            attributes: ['idResidencia', 'nombrePlan']
        })
        .then(residenciales => {
            // Si hay registros, los devolvemos
            if (residenciales.length > 0) {
                return res.status(200).send(residenciales);
            } else {
                // Si no hay registros, devolvemos un mensaje
                return res.status(404).send({
                    message: 'No se encontraron residenciales.'
                });
            }
        })
        .catch(error => {
            // Si ocurre un error, lo manejamos aquí
            console.error("Error al recuperar los datos:", error);
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos.'
            });
        });
    },

    create(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            nombrePlan: datos.nombrePlan,
            precio: datos.precio,
            televisores: datos.televisores,
            telefonoFijo: datos.telefonoFijo,
            velocidadInternet: datos.velocidadInternet,
            estado: 1 // Se asigna un valor predeterminado de 1 al crear
        };

        RESIDENCIALES.create(datos_ingreso)
        .then(residencial => {
            res.status(201).send(residencial);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar residencia' });
        });
    },

    update(req, res) {
        const datos = req.body;
        const id = datos.idResidencia;

        const camposActualizados = {};

        if (datos.nombrePlan !== undefined) camposActualizados.nombrePlan = datos.nombrePlan;
        if (datos.precio !== undefined) camposActualizados.precio = datos.precio;
        if (datos.televisores !== undefined) camposActualizados.televisores = datos.televisores;
        if (datos.telefonoFijo !== undefined) camposActualizados.telefonoFijo = datos.telefonoFijo;
        if (datos.velocidadInternet !== undefined) camposActualizados.velocidadInternet = datos.velocidadInternet;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; // Permite actualizar el estado

        return RESIDENCIALES.update(
            camposActualizados,
            {
                where: { idResidencia: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Residencia no encontrada' });
            }
            return res.status(200).send('El registro ha sido actualizado');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar' });
        });
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
