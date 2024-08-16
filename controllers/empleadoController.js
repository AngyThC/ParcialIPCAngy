'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Empleado = db.empleados;

module.exports = {
  async getAllEmpleados(req, res) { // getAll empleados
    try {
      const empleados = await Empleado.findAll();

      if (empleados.length === 0) {
        return res.status(404).json({ message: 'No se encontraron empleados' });
      }

      res.status(200).json(empleados);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
      res.status(500).json({ error: 'Error al obtener los empleados' });
    }
  },

  async getEmpleadoById(req, res) { // getById empleado
    const { idEmpleado } = req.params;

    try {
      const empleado = await Empleado.findOne({ where: { idEmpleado } });

      if (!empleado) {
        return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
      }

      res.status(200).json(empleado);
    } catch (error) {
      console.error('Error al obtener el empleado:', error);
      res.status(500).json({ error: 'Error al obtener el empleado' });
    }
  },

  async createEmpleadoWithID(req, res) { // crear empleado con el id del usuario
    const { salario, salarioTotal, comision, nombre, dpi, telefono, fechaNacimiento, idUsuario } = req.body;
  
    try {
      // Asegúrate de que la fecha está en formato 'YYYY-MM-DD'
      const fechaNacimientoFormateada = new Date(fechaNacimiento).toISOString().split('T')[0];
  
      const nuevoEmpleado = await Empleado.create({
        salario,
        salarioTotal: salario, // Asigna el mismo valor de salario a salarioTotal
        comision,
        nombre,
        dpi,
        telefono,
        fechaNacimiento: fechaNacimientoFormateada, // Usa el formato adecuado
        idUsuario
      });
  
      res.status(201).json({ message: 'Empleado creado exitosamente', empleado: nuevoEmpleado });
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      res.status(500).json({ error: 'Error al crear el empleado' });
    }
  },
  
  async updateEmpleadoWithID(req, res) { // actualizar a los empleados por id
    const { idEmpleado } = req.params;
    const { salario, salarioTotal, comision, nombre, dpi, telefono, fechaNacimiento, idUsuario } = req.body;
  
    try {
      const empleado = await Empleado.findOne({ where: { idEmpleado } });
  
      if (!empleado) {
        return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
      }
  
      // Solo actualizar los campos que fueron enviados en la solicitud
      if (salario !== undefined) empleado.salario = salario;
      if (salarioTotal !== undefined) empleado.salarioTotal = salarioTotal;
      if (comision !== undefined) empleado.comision = comision;
      if (nombre !== undefined) empleado.nombre = nombre;
      if (dpi !== undefined) empleado.dpi = dpi;
      if (telefono !== undefined) empleado.telefono = telefono;
  
      // Procesa la fecha solo si está definida
      if (fechaNacimiento !== undefined) {
        // Asegúrate de que la fecha está en formato 'YYYY-MM-DD'
        const fechaNacimientoFormateada = new Date(fechaNacimiento).toISOString().split('T')[0];
        empleado.fechaNacimiento = fechaNacimientoFormateada;
      }
  
      if (idUsuario !== undefined) empleado.idUsuario = idUsuario;
  
      await empleado.save();
  
      res.status(200).json({ message: `Empleado con id: ${idEmpleado} actualizado exitosamente`, empleado });
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
  },

  async deleteEmpleadoWithID(req, res) { // eliminar un empleado por su id
    const { idEmpleado } = req.params;

    try {
      const empleado = await Empleado.findOne({ where: { idEmpleado } });

      if (!empleado) {
        return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
      }

      await empleado.destroy();

      res.status(200).json({ message: `Empleado con id: ${idEmpleado} ha sido eliminado` });
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
  }
}
