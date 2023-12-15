const Product = require('../models/Product');
const connectCollection = require("../config/mongo");
const imgLogic = require('../utils/imgLogic');
const authLogic = require('../utils/authLogic');

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
            res.json('Producto creado con éxito');
        }
        else{
            res.json('No tienes los permisos adecuados.');
        }


        // Crea una nueva instancia de Product con los datos del cuerpo de la solicitud

    } catch (error) {
        // Manejo de errores: Imprime el error en la consola y responde con un código de estado 500 y el mensaje de error
        console.error(error);
        res.status(500).send(error.message);
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        products.forEach((element) => {
            if (element.img.startsWith('img')) {
                element.img = 'http://localhost:4000/img/' + element.img;
               // element.img = imgLogic.loadImg(element);
                /*      PARA EL ACCESO A LA CARPETA LOCAL DE LAS IMÁGENES */
                // element.img = 'http://localhost:4000/img/' + element.img; 
            }
        })

        res.json(products);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

// Controlador para eliminar un producto por su ID
exports.deleteProduct = async (req, res) => {
    const { collection, client } = connectCollection("shop", "products");
    try {
        if (await authLogic.checkRBAC(req, ['Admin', 'Employee'])) {
            
            // Busca y elimina el producto por su ID
            //Versión Mongoose
            /*const queryResult = await Product.findOneAndDelete({ _id: req.params.id });*/
    
            //Versión MongoDB
            const img = await collection.findOne({_id:req.params.id},{img:1, _id:0}) ;
            const queryResult = await collection.bulkWrite([
                {deleteOne:{filter:{_id:req.params.id}}},{updateMany:{filter:{}}}])
            

            // Si el producto no existe, responde con un código de estado 500 y un mensaje
            if (!queryResult) {
                res.status(500).send('No hay cliente');
            } else {
                // Si el producto se eliminó con éxito, elimina también la imagen asociada y responde con el producto eliminado
                imgLogic.deleteImg(queryResult.img);
                res.json(queryResult);
            }
        } else {
            res.json('No tienes permisos.');
        }

    } catch (error) {
        // Manejo de errores: Imprime el error en la consola y responde con un código de estado 500 y el mensaje de error
        //console.log(error);
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
}

// Controlador para actualizar un producto por su ID
exports.updateProduct = async (req, res) => {
    try {
        if (await authLogic.checkRBAC(req, ['Admin', 'Employee'])) {
            // Procesa la nueva imagen asociada al producto y actualiza el campo 'img' en el producto
            req.body.img = await imgLogic.processImg(req);
    
            // Busca y actualiza el producto por su ID
            const queryResult = await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
    
            // Si el producto no existe, responde con un código de estado 404 y un mensaje
            if (!queryResult) {
                res.status(404).json('No existe ese producto');
            } else {
                // Si el producto se actualizó con éxito, elimina la imagen antigua asociada y responde con un mensaje de éxito
                imgLogic.deleteImg(queryResult.img);
                res.json('Producto modificado con éxito');
            }
            
        } else {
            res.json('No tienes los permisos necesarios.')
        }
    } catch (error) {
        // Manejo de errores: Imprime el error en la consola y responde con un código de estado 500 y el mensaje de error
        console.log(error);
        res.status(500).send(error.message);
    }
}

// exports.viewImg = (req, res) => {
//   req.json();
// };

// exports.delete(id: any): Observable<any> {
//     return this._http.delete('http://localhost:4000/removeproduct/' + id);
// }

/* esto último lo hemos pasado al archivo imgLogic.js en la carpeta utils

function validateBase64Image(base64String){
    try { //decodificamos la imagen de base64
        if(!base64String.startsWith('data:image/')){
            throw new Error('Formato de imagen no válido.');
        }
        const buffer = Buffer.from(base64String.split(',')[1],'base64'); //buffer es una interfaz de dos parámetros
        const dimensions = base64ToImage(buffer);
        if(dimensions.width !== dimensions.height){
            throw new Error('La imagen no es cuadrada.');
        }
        if(dimensions.width < 500 || dimensions.height < 500) {
            throw new Error('La imagen es demasiado pequeña.');
        } // return true;
    } catch(error){
        throw error;
    }
}

function getMimeTypeFromUrl(url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Error al recuperar la imagen. Código de estado: '+response.status);
        }

        const contentType = response.headers.get('Content-Type');
        if(!contentType){
            throw new Error('No se encontró el Content-Type en la cabecera');
        }
        return contentType;
    })
    .catch(error => {
        throw new Error ('URL no válida');
    })
}

function validateMimeType(mime){
    if(mime.startsWith('image')){
        console.log('Tipo MIME de la imagen válido');
    } else {
        console.log('Tipo MIME de la imagen: ', mime);
        throw new Error('La URL no es una imagen válida');
    }
}
*/
