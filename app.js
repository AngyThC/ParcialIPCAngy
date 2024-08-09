const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Reemplaza con tu usuario
  password: '',  // Reemplaza con tu contraseña
  database: 'tiendatelefonos'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Rutas CRUD para la tabla telefonos
app.post('/telefonos', (req, res) => {
  const { nombre, modelo, especificaciones, precio } = req.body;
  const query = 'INSERT INTO telefonos (nombre, modelo, especificaciones, precio) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, modelo, especificaciones, precio], (err, results) => {
    if (err) throw err;
    res.send({ idTelefono: results.insertId });
  });
});

app.get('/telefonos', (req, res) => {
  const query = 'SELECT * FROM telefonos';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/telefonos/:idTelefono', (req, res) => {
  const { idTelefono } = req.params;
  const query = 'SELECT * FROM telefonos WHERE idTelefono = ?';
  db.query(query, [idTelefono], (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

app.put('/telefonos/:idTelefono', (req, res) => {
  const { idTelefono } = req.params;
  const { nombre, modelo, especificaciones, precio } = req.body;
  const query = 'UPDATE telefonos SET nombre = ?, modelo = ?, especificaciones = ?, precio = ? WHERE idTelefono = ?';
  db.query(query, [nombre, modelo, especificaciones, precio, idTelefono], (err, results) => {
    if (err) throw err;
    res.send({ message: 'Teléfono actualizado' });
  });
});

app.delete('/telefonos/:idTelefono', (req, res) => {
  const { idTelefono } = req.params;
  const query = 'DELETE FROM telefonos WHERE idTelefono = ?';
  db.query(query, [idTelefono], (err, results) => {
    if (err) throw err;
    res.send({ message: 'Teléfono eliminado' });
  });
});

// Servir archivos estáticos
app.use(express.static('./public'));

// Manejo de rutas desconocidas
app.get('*', (req, res) => res.status(200).send({
  message: 'Index.',
}));

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
