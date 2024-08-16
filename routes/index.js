const { Router } = require('express');
const proyectosController = require('../controllers/proyectosController');
const empleadosController = require('../controllers/empleadosController');
const router = Router();


module.exports = (app) => {
    // Rutas Públicas (No protegidas por el middleware)
    // Rutas de Detalles de Ventas (Protegidas)
    router.get('/proyectos/get', proyectosController.find);
    router.get('/proyectos/:id', proyectosController.findById);
    router.post('/proyectos/create', proyectosController.create);
    router.put('/proyectos/update/:id', proyectosController.update);
    router.delete('/proyectos/delete/:id', proyectosController.delete);
    
    router.get('/empleados/get', empleadosController.find);
    router.get('/empleados/:id', empleadosController.findById);
    router.post('/empleados/create', empleadosController.create);
    router.put('/empleados/update/:id', empleadosController.update);
    router.delete('/empleados/delete/:id', empleadosController.delete);
    

    // Utilizar el enrutador en la aplicación
    app.use('/', router);
};
