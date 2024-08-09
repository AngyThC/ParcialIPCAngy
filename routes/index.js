const { Router } = require('express');
const router = Router();

// Aqui van los imports

const controllerRecarga = require('../controllers/RecargaController/recargaController')

//RUTAS
module.exports = (app) => {

    //AQUI VAN LAS RUTAS

    app.use('/', router);

    router.get('/recargas/getAll', controllerRecarga.getAllRecargas);
    router.get('/recargas/getId/:idRecarga', controllerRecarga.getRecargaById)

};