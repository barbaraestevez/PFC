// Importa el módulo de 'express' para construir el enrutador de la aplicación
const express = require('express');

// Crea una instancia del enrutador de Express
const router = express.Router();
const controllers = require('../controllers/orderController');

router.post('/', controllers.sendEmail);