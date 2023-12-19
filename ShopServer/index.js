// Importa el módulo 'express' para construir aplicaciones web con Node.js
const express = require('express');
require('dotenv').config();
const path = require('path');

// Importa la función 'connectDB' desde el módulo './config/db', que se encargará de establecer la conexión con MongoDB
const connectDB = require('./config/db');
const User = require('./models/User');
const PORT = process.env.PORT || 3000;

// Importa el módulo 'cors' para habilitar el intercambio de recursos entre diferentes dominios (CORS)
const cors = require('cors');

// Crea una instancia de la aplicación Express
const app = express();

// Middleware: Configura el uso de JSON para el cuerpo de las solicitudes con un límite de 10 megabytes
app.use(express.json({ limit: '10mb' }));

// Middleware: Habilita CORS para permitir solicitudes desde n dominios y el uso de credenciales
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));

// Middleware: Asocia las rutas definidas en './routes/product' con el prefijo '/api/products'
app.use('/api/products', require('./routes/product'));
app.use('/auth/user', require('./routes/user'));
app.use('/img', express.static(path.join(__dirname, 'img')));


// Conecta con la base de datos MongoDB utilizando la función 'connectDB'
connectDB();
User.createSchema();

// Establece el servidor para escuchar en el puerto 4000 y muestra un mensaje en la consola cuando el servidor está listo
app.listen(PORT, () => {
    console.log('Servidor corriendo correctamente en el puerto 4000.');
});

// En resumen:
// Express y Configuración:
//
// Se importa Express y se crea una instancia de la aplicación.
// Se configura el uso de middleware para manejar solicitudes JSON y se habilita CORS.
// Rutas y Controladores:
//
// Se utiliza la ruta '/api/products' y se asocia con el archivo de rutas './routes/product'.Esto sugiere que hay rutas relacionadas con productos definidas en ese archivo.
// Conexión con MongoDB:
//
// Se llama a la función connectDB() para establecer la conexión con la base de datos MongoDB.
// Escucha del Servidor:
//
// El servidor se inicia y escucha en el puerto 4000. Se muestra un mensaje en la consola indicando que el servidor está corriendo correctamente.
// Si tienes más archivos relacionados con el proyecto, puedes compartirlos para una explicación más completa.