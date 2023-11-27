const Product = require('../models/Product');
const imgLogic = require('../utils/imgLogic');


exports.crearProducto = async (req, res) => {
    try {
        let product = new Product(req.body);

        product.img = await imgLogic.processImg(req);

        await product.save();

        res.json('Producto creado con éxito');

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        products.forEach((element) => {
            if (element.img.startsWith('img')) {
                element.img = imgLogic.loadImg(element);
            }
        })

        res.json(products);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        //const queryResult = await Product.deleteOne({ _id: req.params.id }).exec();
        const queryResult = await Product.findOneAndDelete({ _id: req.params.id });
       
        if (!queryResult) {
            res.status(500).send('No hay cliente');
        }
        else {
            imgLogic.deleteImg(queryResult.img);
            res.json(queryResult);
        }


    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        req.body.img = await imgLogic.processImg(req);

        const queryResult = await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
       
        if (!queryResult) {
            res.status(404).json('No existe ese producto');
        }
        else {
            res.json('Producto modificado con éxito');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

// exports.viewImg = (req, res) => {
//   req.json();
// };

// exports.delete(id: any): Observable<any> {
//     return this._http.delete('http://localhost:3000/removeproduct/' + id);
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
