const { Router } = require('express');
const router = Router();

// Importar el middleware de autenticación con la ruta correcta
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Importar el controlador de usuarios
const usuariosController = require('../controllers/usuariosController');
const clientesController = require('../controllers/clientesController');

// Definir las rutas

module.exports = (app) => {

    // Rutas Públicas (No protegidas por el middleware)
    router.post('/login', usuariosController.login);

    // Aplicar el middleware de autenticación a partir de aquí
    router.use(authenticateToken);

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
