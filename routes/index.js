const { Router } = require('express');
const router = Router();

const residencialesController = require('../controllers/residencialesController');

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

    app.use('/', router);

 
};