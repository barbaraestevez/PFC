// esquema de mongoose para modelar la estructura de datos de un producto en tu base de datos MongoDB

// Importa el módulo 'mongoose' para interactuar con MongoDB
const mongoose = require('mongoose');

// Define un esquema (schema) para el modelo de productos
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ofDate: {
        type: Date,
        default: Date.now()
    }
});

// Exporta el modelo 'Product' creado a partir del esquema 'ProductSchema'
module.exports = mongoose.model('Product', ProductSchema);


// Explicación detallada:
//
// Mongoose Schema:
//
// Se utiliza mongoose.Schema para definir la estructura del esquema de la colección de productos.
// Campos del Producto:
//
// name: Nombre del producto, de tipo String y es obligatorio(required: true).
// category: Categoría del producto, de tipo String y es obligatorio.
// location: Ubicación del producto, de tipo String y es obligatorio.
// img: Ruta o nombre de archivo de la imagen del producto, de tipo String y es obligatorio.
// price: Precio del producto, de tipo Number y es obligatorio.
// ofDate: Fecha de creación del producto, de tipo Date con un valor predeterminado de la fecha y hora actuales(Date.now()).
// Exportación del Modelo:
//
// Se exporta el modelo 'Product' creado a partir del esquema 'ProductSchema'.Este modelo se utilizará para interactuar con la colección de productos en la base de datos MongoDB.
// Este esquema define la estructura que deben seguir los documentos en la colección de productos.Cada documento en esta colección contendrá información sobre un producto, como su nombre, categoría, ubicación, imagen, precio y fecha de creación.