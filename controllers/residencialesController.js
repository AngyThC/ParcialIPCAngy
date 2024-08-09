'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const RESIDENCIALES = db.residenciales;

module.exports = {
    find(req, res) {
        return RESIDENCIALES.findAll()
            .then(residenciales => {
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
                return res.status(200).send(residencial);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },


    create (req, res) {
        let datos = req.body 
        const datos_ingreso = { 
            precio: datos.precio,
            televisores: datos.televisores,
            telefonoFijo: datos.telefonoFijo,
            velocidadInternet: datos.velocidadInternet,
        };

        RESIDENCIALES.create(datos_ingreso)
        .then(recidencial => {
            res.send(recidencial);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar residencia' });
        });
    },

    update(req, res) {
        const datos = req.body;
        const id = datos.idResidencia;
    
        const camposActualizados = {};
    
        if (datos.precio !== undefined) camposActualizados.precio = datos.precio;
        if (datos.televisores !== undefined) camposActualizados.televisores = datos.televisores;
        if (datos.telefonoFijo !== undefined) camposActualizados.telefonoFijo = datos.telefonoFijo;
        if (datos.velocidadInternet !== undefined) camposActualizados.velocidadInternet = datos.velocidadInternet;
    
        return RESIDENCIALES.update(
            camposActualizados,
            {
                where: { idResidencia: id } 
            }
        )
        .then(() => res.status(200).send('El registro ha sido actualizado'))
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
