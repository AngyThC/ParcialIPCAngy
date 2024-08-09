const { Router } = require('express');
const router = Router();

// Aqui van los imports
const usuariosController = require('../controllers/usuariosController');
//RUTAS

module.exports = (app) => {

    //AQUI VAN LAS RUTAS
    router.post('/usuarios', usuariosController.create);
    router.get('/usuarios', usuariosController.find);
    router.get('/usuarios/:id', usuariosController.findById);
    router.put('/usuarios/:id', usuariosController.update);
    router.delete('/usuarios/:id', usuariosController.delete);

    app.use('/', router);

};