const express = require('express');
const router = express.Router();
const controllers = require('../controllers/productController');

router.post('/', controllers.crearProducto) //raíz,controlador ||| (req,res,next)

module.exports = router;