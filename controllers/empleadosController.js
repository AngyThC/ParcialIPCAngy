'use strict';
const db = require("../models");
const Empleados = db.empleados;

module.exports = {

    find(req, res) {
        return Empleados.findAll({
            where: {
                estado: 1 
            }
        })
        .then(empleados => {
            return res.status(200).send(empleados);
        })
        .catch(error => {
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos de empleados.'
            });
        });
    },

    findById(req, res) {
        const id = req.params.id;
        return Empleados.findByPk(id)
            .then(empleado => {
                if (!empleado) {
                    return res.status(404).send({
                        message: 'Empleado no encontrado.'
                    });
                }
                return res.status(200).send(empleado);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },


    findAllEmpleados(req, res) {
        return Empleados.findAll({
            attributes: ['nombre', 'idEmpleado'],
            where: {
                estado: 1 
            }
        })
        .then(empleados => {
            if (empleados.length > 0) {
                return res.status(200).send(empleados);
            } else {
                return res.status(404).send({
                    message: 'No se encontraron empleados.'
                });
            }
        })
        .catch(error => {
            console.error("Error al recuperar los datos:", error);
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos de empleados.'
            });
        });
    },

    create(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            nombre: datos.nombre,
            apellido: datos.apellido,
            telefono: datos.telefono,
            email: datos.email,
            fechaNacimiento: datos.fechaNacimiento,
            tipoTrabajo: datos.tipoTrabajo,
            estado: 1, 
            idProyecto: datos.idProyecto || null
        };

        Empleados.create(datos_ingreso)
        .then(empleado => {
            res.status(201).send(empleado);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar empleado' });
        });
    },


    update(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.nombre !== undefined) camposActualizados.nombre = datos.nombre;
        if (datos.apellido !== undefined) camposActualizados.apellido = datos.apellido;
        if (datos.telefono !== undefined) camposActualizados.telefono = datos.telefono;
        if (datos.email !== undefined) camposActualizados.email = datos.email;
        if (datos.fechaNacimiento !== undefined) camposActualizados.fechaNacimiento = datos.fechaNacimiento;
        if (datos.tipoTrabajo !== undefined) camposActualizados.tipoTrabajo = datos.tipoTrabajo;
        if (datos.estado !== undefined) camposActualizados.estado = datos.estado; 
        if (datos.idProyecto !== undefined) camposActualizados.idProyecto = datos.idProyecto; 

        return Empleados.update(
            camposActualizados,
            {
                where: { idEmpleado: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Empleado no encontrado' });
            }
            return res.status(200).send('El empleado ha sido actualizado');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar empleado' });
        });
    },    

    async delete(req, res) {
        const id = req.params.id; 
    
        try {
            const empleado = await Empleados.findByPk(id);
    
            if (!empleado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
    
            await empleado.destroy();
            return res.json({ message: 'Empleado eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            return res.status(500).json({ error: 'Error al eliminar empleado' });
        }
    }
};
