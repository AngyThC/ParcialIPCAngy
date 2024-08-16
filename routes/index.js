const { Router } = require('express');
const router = Router();

// Importar el middleware de autenticación con la ruta correcta
const { authenticateToken } = require('../middlewares/authMiddleware'); 

// Importar el controlador de usuarios
const residencialesController = require('../controllers/residencialesController');
const telefonosController = require('../controllers/telefonosController');
const controllerRecarga = require('../controllers/recargaController');
const usuariosController = require('../controllers/usuariosController');
const controllerEmpleado = require('../controllers/empleadoController');
const clientesController = require('../controllers/clientesController');
const ventasController = require('../controllers/ventasController');
const detalleVentasController = require('../controllers/detalleVentasController');

module.exports = (app) => {
    // Rutas Públicas (No protegidas por el middleware)
    router.post('/login', usuariosController.login);
    
    // Aplicar el middleware de autenticación a partir de aquí
    // <---------------------------------------------------------------------------------------------------------------------------------------->
      //ruta GET Residencial
      router.get('/residenciales/get', residencialesController.find);
      //ruta GETby Id Residencial
      router.get('/residenciales/:idResidencia', residencialesController.findById);
      //ruta GETByNOmbrePlan
      router.get('/residenciales', residencialesController.findAllResidenciales);
      //ruta POST residencial
      router.post('/residenciales/create', residencialesController.create);
      //ruta PUT residencial
      router.put('/residenciales/update', residencialesController.update);
      //ruta DELETE residencial
      router.delete('/residenciales/delete/:idResidencia', residencialesController.delete);

    router.use(authenticateToken);

    // <-------------------------- TABLAS FUERTES -------------------------->

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

    // Rutas de Recargas (Protegidas)
    router.get('/recargas/getAll', controllerRecarga.getAllRecargas);
    router.get('/recargas/getId/:idRecarga', controllerRecarga.getRecargaById);
    router.post('/recargas/create', controllerRecarga.createRecarga);
    router.put('/recargas/update/:idRecarga', controllerRecarga.updateRecarga);
    router.delete('/recargas/delete/:idRecarga', controllerRecarga.deleteRecarga);

    // Rutas de Telefonos (Protegidas)
    router.get('/telefonos/get', telefonosController.find);
    router.get('/telefonos/:idTelefono', telefonosController.findById);
    router.post('/telefonos/create', telefonosController.create);
    router.put('/telefonos/update/:idTelefono', telefonosController.update);
    router.delete('/telefonos/delete/:idTelefono', telefonosController.delete);

  

    // <-------------------------- TABLAS DEBILES -------------------------->

    // rutas de empleados (Protegidas)
    router.get('/empleados/getAll', controllerEmpleado.getAllEmpleados); // obtener todos
    router.get('/empleados/getId/:idEmpleado', controllerEmpleado.getEmpleadoById); // obtener por id de empleado
    router.post('/empleados/createIDE', controllerEmpleado.createEmpleadoWithID); // crear con el id de usuario
    router.put('/empleados/update/:idEmpleado', controllerEmpleado.updateEmpleadoWithID); // actualizar por id de empleado
    router.delete('/empleados/delete/:idEmpleado', controllerEmpleado.deleteEmpleadoWithID); // eliminar por id de empleado

    // Rutas de Ventas
    router.get('/ventas/get', ventasController.getAllVentas); // Obtener todas las ventas
    router.get('/ventas/:idVenta', ventasController.getVentaById); // Obtener una venta por ID
    router.post('/ventas/create', ventasController.createVenta); // Crear una nueva venta
    router.put('/ventas/update/:idVenta', ventasController.updateVenta); // Actualizar una venta por ID
    router.delete('/ventas/delete/:idVenta', ventasController.deleteVenta); // Eliminar una venta por ID

    // Rutas de Detalles de Ventas (Protegidas)
    router.get('/detalleventas/get', detalleVentasController.find);
    router.get('/detalleventas/:idDetalle', detalleVentasController.findById);
    router.post('/detalleventas/create', detalleVentasController.create);
    router.put('/detalleventas/update/:idDetalle', detalleVentasController.update);
    router.delete('/detalleventas/delete/:idDetalle', detalleVentasController.delete);

    // Utilizar el enrutador en la aplicación
    app.use('/', router);
};
