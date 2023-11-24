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
        } else {
            //lógica de imagen URL
            await getMimeTypeFromUrl(req.body.img).then(
                response => {
                    validateMimeType(response);
                }
            )
            .catch(error =>{
                throw error;
            })
        }

        product = new Product(req.body);
        await product.save();

        res.send(product);

    } catch (error) {
        // console.error(error)
        res.status(500).send(error.message);

    }
}

exports.getAllProducts = async (req,res) => {
    try {
        const products = await Product.find(); //un find() sin un parámetro dentro es como si fuera un findAll
        res.json(products)
    } catch (error) {
        res.status(500).send('Ha habido un error');
    }
}

exports.deleteProduct = async (req,res) => {
    try {
        const queryResult = await Product.findOneAndDelete({ _id: req.params.id });
        if(queryResult){
            res.send('Producto eliminado con éxito');
        }
        else {
            throw new Error ('No se ha eliminado ningún registro');
        }
    } catch (error) {
        res.status(500).send(error);
    }
    /*try {
        const queryResult = await Product.findOneAndDelete({ _id: req.params.id });
        const message = queryResult ? 'Producto eliminado con éxito' : 'No se ha encontrado ningún registro con ese id'
        res.json(queryResult);
    } catch (error) {
        res.status(500).send('No se ha eliminado ningún registro ' + error);
    }*/
}

exports.updateProduct = async (req,res) => {
    try {
     /*   const {name, category, location, img, price} = req.body;
        let newProduct = await Product.findById(req.params.id);
        if(!newProduct) {
            res.status(400).json({msg:'No existe el producto'});
        }
        newProduct.name = name;
        newProduct.category = category;
        newProduct.location = location;
        newProduct.img = img;
        newProduct.price = price; */

        /*newProduct = await Product.findOneAndUpdate({_id: req.params._id}, newProduct, {});*/
        
        const queryResult = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {new:true});
        res.json(queryResult);


    } catch (error) {
        console.log(error);
        res.status(500).send('¡Error Crítico!');

    }
}

// exports.delete(id: any): Observable<any> {
//     return this._http.delete('http://localhost:3000/removeproduct/' + id);
// }

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