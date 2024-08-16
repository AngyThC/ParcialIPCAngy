const { Router } = require('express');
const proyectosController = require('../controllers/proyectosController');
const router = Router();


module.exports = (app) => {
    // Rutas Públicas (No protegidas por el middleware)
    // Rutas de Detalles de Ventas (Protegidas)
    router.get('/proyectos/get', proyectosController.find);
    router.get('/proyectos/:idDetalle', proyectosController.findById);
    router.post('/proyectos/create', proyectosController.create);
    router.put('/proyectos/update/:id', proyectosController.update);
    router.delete('/proyectos/delete/:id', proyectosController.delete);
    

    // Utilizar el enrutador en la aplicación
    app.use('/', router);
};
