const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = 3001;

// Cargar variables de entorno desde .env
dotenv.config();

app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD ||'',
  database: process.env.DB_NAME || 'vehiculo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.get('/opciones', (req, res) => {
  connection.query('SELECT patente, modelo, version, anio, kilometros, color, precioLista, precioMedio, precioMinimo FROM usado', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
