const { Router } = require('express');
const router = Router();

// Importar el middleware de autenticación con la ruta correcta
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Importar el controlador de usuarios
const residencialesController = require('../controllers/residencialesController');

const telefonosController = require('../controllers/telefonosController');
const controllerRecarga = require('../controllers/recargaController')
const usuariosController = require('../controllers/usuariosController');
const clientesController = require('../controllers/clientesController');

// Definir las rutas
module.exports = (app) => {
    // Rutas Públicas (No protegidas por el middleware)
    router.post('/login', usuariosController.login);

    // Rutas de Telefonos
    router.get('/telefonos/get', telefonosController.find);
    router.get('/telefonos/:idTelefono', telefonosController.findById);
    router.post('/telefonos/create', telefonosController.create);
    router.put('/telefonos/update/:idTelefono', telefonosController.update);
    router.delete('/telefonos/delete/:idTelefono', telefonosController.delete);

    // rutas de recargas
    router.get('/recargas/getAll', controllerRecarga.getAllRecargas);
    router.get('/recargas/getId/:idRecarga', controllerRecarga.getRecargaById);
    router.post('/recargas/create', controllerRecarga.createRecarga);
    router.put('/recargas/update/:idRecarga', controllerRecarga.updateRecarga);
    router.delete('/recargas/delete/:idRecarga', controllerRecarga.deleteRecarga);

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

    // Rutas de Usuarios (Protegidas)
    router.get('/usuarios', usuariosController.find);
    router.get('/usuarios/:id', usuariosController.findById);
    router.post('/usuarios', usuariosController.create);
    router.put('/usuarios/:id', usuariosController.update);
    router.delete('/usuarios/:id', usuariosController.delete);

    // Rutas de Clientes (Protegidas)
    router.get('/clientes', clientesController.find);
    router.get('/clientes/:id', clientesController.findById);
    router.post('/clientes', clientesController.create);
    router.put('/clientes/:id', clientesController.update);
    router.delete('/clientes/:id', clientesController.delete);

    // Utilizar el enrutador en la aplicación
    app.use('/', router);
};
