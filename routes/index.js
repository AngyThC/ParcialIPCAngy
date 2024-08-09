const { Router } = require('express');
const router = Router();

const residencialesController = require('../controllers/residencialesController');

const controllerRecarga = require('../controllers/RecargaController/recargaController')
const usuariosController = require('../controllers/usuariosController');
//RUTAS
module.exports = (app) => {

   //ruta GET Residencial
   router.get('/residenciales/get', residencialesController.find);
   //ruta GETby Id Residencial
   router.get('/residenciales/:idResidencia', residencialesController.findById);
   //ruta POST residencial
   router.post('/residenciales/create', residencialesController.create);
   //ruta PUT residencial
   router.put('/residenciales/update', residencialesController.update);
   //ruta DELETE residencial
   router.delete('/residenciales/delete/:idResidencia', residencialesController.delete)
    //AQUI VAN LAS RUTAS
    router.post('/usuarios', usuariosController.create);
    router.get('/usuarios', usuariosController.find);
    router.get('/usuarios/:id', usuariosController.findById);
    router.put('/usuarios/:id', usuariosController.update);
    router.delete('/usuarios/:id', usuariosController.delete);

    app.use('/', router);

    // rutas de recargas
    router.get('/recargas/getAll', controllerRecarga.getAllRecargas);
    router.get('/recargas/getId/:idRecarga', controllerRecarga.getRecargaById);
    router.post('/recargas/create', controllerRecarga.createRecarga);
    router.put('/recargas/update/:idRecarga', controllerRecarga.updateRecarga);
    router.delete('/recargas/delete/:idRecarga', controllerRecarga.deleteRecarga);


 
};