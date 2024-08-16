'use strict';
const db = require("../models");
const Proyectos = db.proyectos;

module.exports = {

    find(req, res) {
        return Proyectos.findAll()
            .then(proyectos => {
                return res.status(200).send(proyectos);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        return Proyectos.findByPk(id)
            .then(proyecto => {
                if (!proyecto) {
                    return res.status(404).send({
                        message: 'Proyecto no encontrado.'
                    });
                }
                return res.status(200).send(proyecto);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    create(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            fechaInicio: datos.fechaInicio,
            fechaFin: datos.fechaFin,
            porcentaje: datos.porcentaje || 0 
        };

        Proyectos.create(datos_ingreso)
        .then(proyecto => {
            res.status(201).send(proyecto);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar proyecto' });
        });
    },

    update(req, res) {
        const datos = req.body;
        const id = req.params.id;
    
        if (!id) {
            return res.status(400).send({
                message: "El id del proyecto es necesario para actualizar."
            });
        }

        const camposActualizados = {};
    
        if (datos.nombre !== undefined) camposActualizados.nombre = datos.nombre;
        if (datos.descripcion !== undefined) camposActualizados.descripcion = datos.descripcion;
        if (datos.fechaInicio !== undefined) camposActualizados.fechaInicio = datos.fechaInicio;
        if (datos.fechaFin !== undefined) camposActualizados.fechaFin = datos.fechaFin;
        if (datos.porcentaje !== undefined) camposActualizados.porcentaje = datos.porcentaje;
    
        if (Object.keys(camposActualizados).length === 0) {
            return res.status(400).send({
                message: "No hay campos para actualizar."
            });
        }
    
        return Proyectos.update(
            camposActualizados,
            {
                where: { idProyecto: id }
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Proyecto no encontrado o no se pudo actualizar.' });
            }
            return res.status(200).send('El proyecto ha sido actualizado');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar proyecto' });
        });
    },
    

    async delete(req, res) {
        const id = req.params.id; 
    
        try {
            const proyecto = await Proyectos.findByPk(id);
    
            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }
    
            await proyecto.destroy();
            return res.json({ message: 'Proyecto eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
            return res.status(500).json({ error: 'Error al eliminar proyecto' });
        }
    }
};
