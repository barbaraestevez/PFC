const Product = require('../models/Product');
const base64ToImage = require('image-size');

exports.crearProducto = async (req,res) => {
    console.log(req.body);
    try {
        let product;
        if(req.body.isLocalFile) {
            const base64String = req.body.img;
            validateBase64Image(base64String);
            console.log('La imagen es válida')
        }
        else{
            //TODO lógica de imagen URL
        }

        product = new Product(req.body);
        await product.save();

        res.send(product);

    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);

    }
}

function validateBase64Image(base64String){
    try { //decodificamos la imagen de base64
        if(!base64String.starsWith('data:image/')){
            throw new Error('Formato de imagen no válido.');
        }
        const buffer = Buffer.from(base64String.split(',')[1],'base64'); //buffer es una interfaz de dos parámetros
        const dimensions = base64ToImage(buffer);
        if(dimensions.width !== dimensions.height){
            throw new Error('La imagen no es cuadrada.');
        }
        if(dimensions.width < 500 || dimensions.height < 500) {
            throw new Error('La imagen es demasiado pequeña.');
        }
        // return true;
    } catch(error){
        throw error;
    }
}