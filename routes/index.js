const { Router } = require('express');
const router = Router();

// Importar el middleware de autenticación con la ruta correcta
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Importar el controlador de usuarios
const residencialesController = require('../controllers/residencialesController');

const controllerRecarga = require('../controllers/RecargaController/recargaController')
const usuariosController = require('../controllers/usuariosController');

// Definir las rutas
module.exports = (app) => {
    // Rutas Públicas (No protegidas por el middleware)
    router.post('/login', usuariosController.login);

    // Aplicar el middleware de autenticación a partir de aquí
    router.use(authenticateToken);

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
    // Rutas Públicas (No protegidas por el middleware)
    router.post('/login', usuariosController.login);

    // Aplicar el middleware de autenticación a partir de aquí
    router.use(authenticateToken);

    // Rutas de Usuarios (Protegidas)
    router.post('/usuarios', usuariosController.create);
    router.get('/usuarios', usuariosController.find);
    router.get('/usuarios/:id', usuariosController.findById);
    router.put('/usuarios/:id', usuariosController.update);
    router.delete('/usuarios/:id', usuariosController.delete);

    // rutas de recargas
    router.get('/recargas/getAll', controllerRecarga.getAllRecargas);
    router.get('/recargas/getId/:idRecarga', controllerRecarga.getRecargaById);
    router.post('/recargas/create', controllerRecarga.createRecarga);
    router.put('/recargas/update/:idRecarga', controllerRecarga.updateRecarga);
    router.delete('/recargas/delete/:idRecarga', controllerRecarga.deleteRecarga);

    // Utilizar el enrutador en la aplicación
    app.use('/', router);
};
