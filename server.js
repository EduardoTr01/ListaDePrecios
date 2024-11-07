const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3001;

// Cargar variables de entorno desde .env
dotenv.config();

// Habilitar CORS para todos los orígenes
app.use(cors({
  origin: '*'
}));

// Middleware para parsear JSON
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vehiculo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener datos de la base de datos
app.get('/opciones', (req, res) => {
  connection.query('SELECT patente, modelo, version, anio, kilometros, color, precioLista, precioMedio, precioMinimo FROM usado', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Iniciar el servidor y permitir conexiones externas
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
