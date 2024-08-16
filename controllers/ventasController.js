'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Venta = db.ventas;
const Empleado = db.empleados;
const Cliente = db.clientes;

module.exports = {
  async getAllVentas(req, res) { // getAll ventas
    try {
      const ventas = await Venta.findAll();

      if (ventas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron ventas' });
      }

      res.status(200).json(ventas);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      res.status(500).json({ error: 'Error al obtener las ventas' });
    }
  },

  async getVentaById(req, res) { // getById ventas
    const { idVenta } = req.params;

    try {
      const venta = await Venta.findOne({ where: { idVenta } });

      if (!venta) {
        return res.status(404).json({ message: `Venta con id: ${idVenta} no encontrada` });
      }

      res.status(200).json(venta);
    } catch (error) {
      console.error('Error al obtener la venta:', error);
      res.status(500).json({ error: 'Error al obtener la venta' });
    }
  },

  async createVenta(req, res) { // create venta
    const { total, fecha, idCliente, idEmpleado } = req.body;

    try {
      // Verificar si existen el cliente y el empleado
      const cliente = await Cliente.findOne({ where: { idCliente } });
      const empleado = await Empleado.findOne({ where: { idEmpleado } });

      if (!cliente) {
        return res.status(404).json({ message: `Cliente con id: ${idCliente} no encontrado` });
      }

      if (!empleado) {
        return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
      }

      // Asegúrate de que la fecha esté en formato 'YYYY-MM-DD'
      const fechaFormateada = new Date(fecha).toISOString().split('T')[0];

      const nuevaVenta = await Venta.create({
        total: total !== undefined ? total : 0, // Usa 0 si no se proporciona un total
        fecha: fechaFormateada,
        idCliente,
        idEmpleado
      });

      res.status(201).json({ message: 'Venta creada exitosamente', venta: nuevaVenta });
    } catch (error) {
      console.error('Error al crear la venta:', error);
      res.status(500).json({ error: 'Error al crear la venta' });
    }
  },

  async updateVenta(req, res) { // update venta
    const { idVenta } = req.params;
    const { total, fecha, idCliente, idEmpleado } = req.body;

    try {
      const venta = await Venta.findOne({ where: { idVenta } });

      if (!venta) {
        return res.status(404).json({ message: `Venta con id: ${idVenta} no encontrada` });
      }

      // Verificar si existen el cliente y el empleado (si están presentes en la solicitud)
      if (idCliente !== undefined) {
        const cliente = await Cliente.findOne({ where: { idCliente } });
        if (!cliente) {
          return res.status(404).json({ message: `Cliente con id: ${idCliente} no encontrado` });
        }
        venta.idCliente = idCliente;
      }

      if (idEmpleado !== undefined) {
        const empleado = await Empleado.findOne({ where: { idEmpleado } });
        if (!empleado) {
          return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
        }
        venta.idEmpleado = idEmpleado;
      }

      // Solo actualizar los campos que fueron enviados en la solicitud
      if (total !== undefined) venta.total = total;

      if (fecha !== undefined) {
        const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
        venta.fecha = fechaFormateada;
      }

      await venta.save();

      res.status(200).json({ message: `Venta con id: ${idVenta} actualizada exitosamente`, venta });
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      res.status(500).json({ error: 'Error al actualizar la venta' });
    }
  },

  async deleteVenta(req, res) { // delete venta
    const { idVenta } = req.params;

    try {
      const venta = await Venta.findOne({ where: { idVenta } });

      if (!venta) {
        return res.status(404).json({ message: `Venta con id: ${idVenta} no encontrada` });
      }

      await venta.destroy();

      res.status(200).json({ message: `Venta con id: ${idVenta} ha sido eliminada` });
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      res.status(500).json({ error: 'Error al eliminar la venta' });
    }
  }
}
