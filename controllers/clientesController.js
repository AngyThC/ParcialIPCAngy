'use strict';
const Sequelize = require('sequelize');
const db = require("../models");
const Clientes = db.clientes;

// Métodos CRUD
module.exports = {

    find(req, res) {
        return Clientes.findAll()
            .then(clientes => {
                return res.status(200).send(clientes);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id; 
        return Clientes.findByPk(id)
            .then(cliente => {
                if (!cliente) {
                    return res.status(404).send({
                        message: 'Cliente no encontrado.'
                    });
                }
                return res.status(200).send(cliente);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

       // Controlador - residencialesController.js
    findAllClientes(req, res) {
        return Clientes.findAll({
            attributes: ['nombre', 'idCliente']
        })
        .then(clientes => {
            // Si hay registros, los devolvemos
            if (clientes.length > 0) {
                return res.status(200).send(clientes);
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
            nombre: datos.nombre,
            dpi: datos.dpi,
            direccion: datos.direccion
        };

        Clientes.create(datos_ingreso)
        .then(cliente => {
            res.status(201).send(cliente);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar cliente' });
        });
    },

    update(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.nombre !== undefined) camposActualizados.nombre = datos.nombre;
        if (datos.dpi !== undefined) camposActualizados.dpi = datos.dpi;
        if (datos.direccion !== undefined) camposActualizados.direccion = datos.direccion;

        return Clientes.update(
            camposActualizados,
            {
                where: { idCliente: id } 
            }
        )
        .then(() => res.status(200).send('El cliente ha sido actualizado'))
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar cliente' });
        });
    },    

    async delete(req, res) {
        const id = req.params.id; 
    
        try {
            const cliente = await Clientes.findByPk(id);
    
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
    
            await cliente.destroy();
            return res.json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            return res.status(500).json({ error: 'Error al eliminar cliente' });
        }
    }
};