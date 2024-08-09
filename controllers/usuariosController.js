'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const Usuarios = db.usuarios;

module.exports = {
    find(req, res) {
        return Usuarios.findAll()
            .then(usuarios => {
                return res.status(200).send(usuarios);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id; 
        return Usuarios.findByPk(id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado.'
                    });
                }
                return res.status(200).send(usuario);
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
            usuario: datos.usuario,
            contrasenia: datos.contrasenia,
        };

        Usuarios.create(datos_ingreso)
        .then(usuario => {
            res.status(201).send(usuario);
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error: 'Error al insertar usuario' });
        });
    },

    update(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.usuario !== undefined) camposActualizados.usuario = datos.usuario;
        if (datos.contrasenia !== undefined) camposActualizados.contrasenia = datos.contrasenia;
    
        return Usuarios.update(
            camposActualizados,
            {
                where: { idUsuario: id } 
            }
        )
        .then(() => res.status(200).send('El usuario ha sido actualizado'))
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        });
    },    

    async delete(req, res) {
        const id = req.params.id; 
    
        try {
            const usuario = await Usuarios.findByPk(id);
    
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            await usuario.destroy();
            return res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }
    
};
