// Importa el módulo 'express' para construir el enrutador de la aplicación
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController');

router.post('/',controllers.createUser);
router.post('/log',controllers.findUserByEmail);
//router.put('/',controllers.addSalesByUser);
//router.get('/',controllers.showStoreDetails);

module.exports = router;