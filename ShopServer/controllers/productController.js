// controlador de los productos en tu aplicación Express

// Importa el modelo 'Product' desde '../models/Product'
const Product = require('../models/Product');
const connectCollection = require('../config/mongo')

// Importa el módulo 'imgLogic' desde '../utils/imgLogic'
const imgLogic = require('../utils/imgLogic');
const authLogic = require('../utils/authLogic');
const { BSON, ObjectId } = require('mongodb');


// Controlador para crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        if (await authLogic.checkRBAC(req, ['Admin', 'Employee'])) {
            let product = new Product(req.body);

            // Procesa la imagen asociada al producto y actualiza el campo 'img' en el producto
            product.img = await imgLogic.processImg(req);

            // Guarda el producto en la base de datos
            await product.save();

            // Responde con un mensaje de éxito en formato JSON
            res.json({ msg: 'Producto creado con éxito', success: true });
        }
        else {
            res.json({ msg: 'No tienes los permisos adecuados.', success: false });
        }


        // Crea una nueva instancia de Product con los datos del cuerpo de la solicitud

    } catch (error) {
        // Manejo de errores: Imprime el error en la consola y responde con un código de estado 500 y el mensaje de error
        res.status(403).json({ msg: error.message, success: false });
    }
}

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        // Obtiene todos los productos de la base de datos
        const products = await Product.find();

        // Modifica las rutas de las imágenes para que tengan la URL completa
        products.forEach((element) => {
            if (element.img.startsWith('img')) {
                element.img = 'http://localhost:4000/img/' + element.img;
            }
        });

        // Responde con la lista de productos en formato JSON
        res.json({ msg: 'GET', success: true, products });
    } catch (error) {
        // Manejo de errores: Responde con un código de estado 500 y un mensaje de error genérico
        res.status(403).json({ msg: 'Se ha producido un error', success: false });
    }
}

// Controlador para eliminar un producto por su ID
exports.deleteProduct = async (req, res) => {
    try {
        if (await authLogic.checkRBAC(req, ['Admin', 'Employee'])) {

            // Busca y elimina el producto por su ID
            // Versión Mongoose
            const queryResult = await Product.findOneAndDelete({ _id: req.params.id });

            // Si el producto no existe, responde con un mensaje
            if (!queryResult) {
                res.json({ msg: "No se encontro el producto", success: false });
            } else {
                // Si el producto se eliminó con éxito, elimina también la imagen asociada y responde con el producto eliminado
                imgLogic.deleteImg(queryResult.img);
                res.json({ msg: "Producto eliminado con éxito", success: true }
                );
            }
        } else {
            res.json({ msg: "No tienes los permisos necesarios", success: false });
        }

    } catch (error) {
        // Manejo de errores: Imprime el error en la consola y responde con un código de estado 500 y el mensaje de error
        res.status(403).json({ msg: error.message, success: false });
    }

}

// Controlador para actualizar un producto por su ID
exports.updateProduct = async (req, res) => {
    try {
        if (await authLogic.checkRBAC(req, ['Admin', 'Employee'])) {
            // Procesa la nueva imagen asociada al producto y actualiza el campo 'img' en el producto
            const newImg = !req.body.img.startsWith('http://localhost:4000/img');
            req.body.img = (newImg) ? await imgLogic.processImg(req) : req.body.img;

            // Busca y actualiza el producto por su ID
            const queryResult = await Product.findOneAndUpdate({ _id: req.params.id }, req.body);

            // Si el producto no existe, responde con un código de estado 404 y un mensaje
            if (!queryResult) {
                res.json({ msg: 'No existe ese producto', success: false });
            } else {
                // Si el producto se actualizó con éxito, elimina la imagen antigua asociada y responde con un mensaje de éxito
                if (newImg) imgLogic.deleteImg(queryResult.img);
                res.json({ msg: 'Producto modificado con éxito', success: true });
            }

        } else {
            res.json({ msg: 'No tienes los permisos necesarios.', success: false })
        }
    } catch (error) {
        // Manejo de errores: responde con un código de estado 403 y el mensaje de error
        res.status(403).json({ msg: error.message, success: false });
    }
}


// En resumen:
//
// Creación de Producto:
//
// El controlador crearProducto crea una nueva instancia del modelo Product con los datos del cuerpo de la solicitud, procesa la imagen asociada y guarda el producto en la base de datos.
// Obtención de Todos los Productos:
//
// El controlador getAllProducts obtiene todos los productos de la base de datos, modifica las rutas de las imágenes y responde con la lista de productos en formato JSON.
// Eliminación de Producto:
//
// El controlador deleteProduct busca y elimina un producto por su ID, eliminando también la imagen asociada si el producto existe.
// Actualización de Producto:
//
// El controlador updateProduct procesa la nueva imagen asociada, busca y actualiza un producto por su ID, eliminando la imagen antigua asociada si el producto existe.
// En general, estos controladores gestionan las operaciones CRUD(Crear, Leer, Actualizar, Eliminar) en la colección de productos de tu base de datos MongoDB.