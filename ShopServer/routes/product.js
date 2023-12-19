// Este archivo parece ser un módulo de rutas para la gestión de productos en tu aplicación Express.Aquí está la explicación detallada:

// Importa el módulo 'express' para construir el enrutador de la aplicación
const express = require('express');

// Crea una instancia del enrutador de Express
const router = express.Router();

// Importa los controladores desde el módulo '../controllers/productController'
const controllers = require('../controllers/productController');

// Definición de rutas y sus correspondientes controladores

// Ruta POST '/': Crear un nuevo producto
router.post('/', controllers.crearProducto);

// Ruta GET '/': Obtener todos los productos
router.get('/', controllers.getAllProducts);

// Ruta GET '/img/:file': Obtener todos los productos (probablemente un error, debería ser otra ruta)
router.get('/img/:file', controllers.getAllProducts);

// Ruta PUT '/:id': Actualizar un producto existente por su ID
router.put('/:id', controllers.updateProduct);

// Ruta DELETE '/:id': Eliminar un producto existente por su ID
router.delete('/:id', controllers.deleteProduct);

// Exporta el enrutador para ser utilizado en otros archivos
module.exports = router;



// En resumen:
//
// Creación del Enrutador:
//
// Se utiliza express.Router() para crear un enrutador independiente.
// Definición de Rutas:
//
// Se definen cinco rutas diferentes:
// POST /: Para crear un nuevo producto.
// GET /: Para obtener todos los productos.
// GET / img /: file: Parece haber un error aquí, ya que esta ruta también está asociada con getAllProducts, debería ser corregido si es necesario.
// PUT /: id: Para actualizar un producto existente según su ID.
// DELETE /: id: Para eliminar un producto existente según su ID.

// Controladores:
// Cada ruta está asociada a un controlador específico importado desde '../controllers/productController'.Los controladores son funciones que manejan la lógica de negocio asociada con cada ruta.
// Exportación del Enrutador:
//
// Se exporta el enrutador para que pueda ser utilizado en otros archivos de la aplicación.
// Asegúrate de revisar el contenido del archivo '../controllers/productController' para entender completamente cómo se manejan las solicitudes en cada una de estas rutas.Si tienes más archivos relacionados con este proyecto, por favor compártelos para obtener una comprensión completa del sistema.
//