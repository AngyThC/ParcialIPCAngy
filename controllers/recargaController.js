'use strict';
const Sequelize = require('sequelize');
const db = require('../models');
const Recarga = db.recargas;

module.exports = {
  async getAllRecargas(req, res) { // getAll recargas
    try {
      // console.log('Iniciando consulta de recargas...'); // Registro de inicio
      const recargas = await Recarga.findAll();

      if (recargas.length === 0) {
        // console.log('No se encontraron recargas.'); // Registro cuando no hay datos
        return res.status(404).json({ message: 'No se encontraron recargas' });
      }

      // console.log('Recargas encontradas:', recargas); // Registro cuando se encuentran datos
      res.status(200).json(recargas);
    } catch (error) {
      // console.error('Error al obtener las recargas:', error); // Registro del error completo
      res.status(500).json({ error: 'Error al obtener las recargas' });
    }
  },

  async getRecargaById(req, res) { // getById recargas
    const { idRecarga } = req.params;

    try {
      const recarga = await Recarga.findOne({ where: { idRecarga } });

      if (!recarga) {
        return res.status(404).json({ message: 'Recarga con id: ${idRecarga} no encontrada' });
      }

      res.status(200).json(recarga);
    } catch (error) {
      console.error('Error al obtener la recarga:', error);
      res.status(500).json({ error: 'Error al obtener la recarga' });
    }
  },

  async createRecarga(req, res) { // create de recargas
    const { precio, internet, minutosLlamada, aplicaciones, dias } = req.body;

    try {
      const nuevaRecarga = await Recarga.create({
        precio,
        internet,
        minutosLlamada,
        aplicaciones,
        dias
      });

      res.status(201).json({ message: 'Recarga creada exitosamente', recarga: nuevaRecarga });
    } catch (error) {
      console.error('Error al crear la recarga:', error);
      res.status(500).json({ error: 'Error al crear la recarga' });
    }
  },

  async updateRecarga(req, res) {
    const { idRecarga } = req.params;
    const { precio, internet, minutosLlamada, aplicaciones, dias } = req.body;

    try {
      const recarga = await Recarga.findOne({ where: { idRecarga } });

      if (!recarga) {
        return res.status(404).json({ message: 'Recarga con id: ${idRecarga} no encontrada' });
      }

      // Solo actualizar los campos que fueron enviados en la solicitud
      if (precio !== undefined) recarga.precio = precio;
      if (internet !== undefined) recarga.internet = internet;
      if (minutosLlamada !== undefined) recarga.minutosLlamada = minutosLlamada;
      if (aplicaciones !== undefined) recarga.aplicaciones = aplicaciones;
      if (dias !== undefined) recarga.dias = dias;

      await recarga.save();

      res.status(200).json({ message: 'Recarga con id: ${idRecarga} actualizada exitosamente', recarga });
    } catch (error) {
      console.error('Error al actualizar la recarga:', error);
      res.status(500).json({ error: 'Error al actualizar la recarga' });
    }
  },

  async deleteRecarga(req, res) {
    const { idRecarga } = req.params;

    try {
      const recarga = await Recarga.findOne({ where: { idRecarga } });

      if (!recarga) {
        return res.status(404).json({ message: `Recarga con id: ${idRecarga} no encontrada` });
      }

      await recarga.destroy();

      res.status(200).json({ message: `Recarga con id: ${idRecarga} ha sido eliminada` });
    } catch (error) {
      console.error('Error al eliminar la recarga:', error);
      res.status(500).json({ error: 'Error al eliminar la recarga' });
    }
  }
}
