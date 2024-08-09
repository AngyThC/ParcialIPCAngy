'use strict';
const Sequelize = require('sequelize');
const db = require('../../models');
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
        return res.status(404).json({ message: 'Recarga no encontrada' });
      }

      res.status(200).json(recarga);
    } catch (error) {
      console.error('Error al obtener la recarga:', error);
      res.status(500).json({ error: 'Error al obtener la recarga' });
    }
  }
}
