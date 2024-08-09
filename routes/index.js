const { Router } = require('express');
const router = Router();

// Importar el middleware de autenticación con la ruta correcta
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Importar el controlador de usuarios
const usuariosController = require('../controllers/usuariosController');

// Definir las rutas

module.exports = (app) => {

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

    // Utilizar el enrutador en la aplicación
    app.use('/', router);

};
