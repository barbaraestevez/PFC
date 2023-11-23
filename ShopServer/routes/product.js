const express = require('express');
const router = express.Router();
const controllers = require('../controllers/productController');

router.post('/', controllers.crearProducto); //raíz,controlador ||| (req,res,next)
router.get('/', controllers.getAllProducts);
router.put('/:id',controllers.updateProduct);
router.delete('/:id', controllers.delete);

module.exports = router;