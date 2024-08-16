'use strict';
const db = require("../models");
const Telefonos = db.Telefonos;

module.exports = {
    find(req, res) {
        return Telefonos.findAll()
            .then(telefonos => {
                return res.status(200).send(telefonos);
            })
            .catch(error => {
                console.error('Error al recuperar los datos:', error);
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.idTelefono;
        return Telefonos.findByPk(id)
            .then(telefono => {
                if (!telefono) {
                    return res.status(404).send({ message: 'Teléfono no encontrado' });
                }
                return res.status(200).send(telefono);
            })
            .catch(error => {
                console.error('Error al intentar recuperar el registro:', error);
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    create(req, res) {
        const datos = req.body;
        const datos_ingreso = {
            nombre: datos.nombre,
            modelo: datos.modelo,
            especificaciones: datos.especificaciones,
            precio: datos.precio,
            estado: 1 // Se asigna un valor predeterminado de 1 al crear
        };

        Telefonos.create(datos_ingreso)
            .then(telefono => {
                return res.status(201).send(telefono);
            })
            .catch(error => {
                console.error('Error al insertar teléfono:', error);
                return res.status(500).json({ error: 'Error al insertar teléfono' });
            });
    },

    update(req, res) {
        const datos = req.body;
        const id = req.params.idTelefono;

        const camposActualizados = {};

        if (datos.nombre !== undefined) camposActualizados.nombre = datos.nombre;
        if (datos.modelo !== undefined) camposActualizados.modelo = datos.modelo;
        if (datos.especificaciones !== undefined) camposActualizados.especificaciones = datos.especificaciones;
        if (datos.precio !== undefined) camposActualizados.precio = datos.precio;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; // Permite actualizar el estado

        return Telefonos.update(
            camposActualizados,
            {
                where: { idTelefono: id }
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Teléfono no encontrado' });
            }
            return res.status(200).send('El registro ha sido actualizado');
        })
        .catch(error => {
            console.error('Error al actualizar el teléfono:', error);
            return res.status(500).json({ error: 'Error al actualizar' });
        });
    },

    async delete(req, res) {
        const id = req.params.idTelefono;

        try {
            const telefono = await Telefonos.findByPk(id);

            if (!telefono) {
                return res.status(404).json({ error: 'Teléfono no encontrado' });
            }

            await telefono.destroy();
            return res.json({ message: 'Teléfono eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar teléfono:', error);
            return res.status(500).json({ error: 'Error al eliminar teléfono' });
        }
    }
};
