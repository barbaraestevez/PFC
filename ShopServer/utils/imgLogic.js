const base64ToImage = require('image-size');
const fs = require('fs');
const path = require('path');
const filePath = (param) => path.join(path.resolve(__dirname, '..'), 'img', param);

function validateBase64Image(base64String) {
    try {
        if (!base64String.startsWith('data:image/')) {
            throw new Error('Formato de imagen no valido.');
        }
        const buffer = Buffer.from(base64String.split(',')[1], 'base64');
        const dimensions = base64ToImage(buffer);

        if (dimensions.width !== dimensions.height) {
            throw new Error('La imagen no es cuadrada.');
        }
        if (dimensions.width < 500 || dimensions.height < 500) {
            throw new Error('La imagen es pequeña.');
        }
    } catch (error) {
        throw error;
    }
}

function getMimeTypeFromUrl(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al recuperar la imagen. Código de estado: ' + response.status);
            }
            const contentType = response.headers.get('Content-Type');

            if (!contentType) {
                throw new Error('No se encontró el Content-Type en la cabecera.');
            }
            return contentType;
        }
        )
        .catch(error => {
            throw new Error('URL no valida');
        })
}

function saveImgFile(req) {
    const base64String = req.body.img;

    const buffer = Buffer.from(base64String.split(',')[1], 'base64');

    const fileType = base64String.split(';')[0].split('/')[1];
    const fileName = `img${Date.now()}.${fileType}`;

    fs.writeFile(filePath(fileName), buffer, (error) => {
        if (error) {
            throw new Error('Error al guardar la imagen.');
        }
        else {
            console.log('Imagen guardada con éxito');
        }
    })

    return fileName;

}

exports.loadImg = (product) => {
    try {
        const img = fs.readFileSync(filePath(product.img));

        const imgBase64 = Buffer.from(img).toString('base64');

        return "data:image/" + product.img.split('.')[1] + ";base64," + imgBase64;

    } catch (error) {
        return "https://sloanreview.mit.edu/wp-content/uploads/2012/03/fail-flickr-Jez-Page-500.jpg";
/*         throw error; */
    }
}

exports.processImg = async (req) => {
    console.log(req.body.isLocalFile);
    if (req.body.isLocalFile) {
        const base64String = req.body.img;
        validateBase64Image(base64String);
        return saveImgFile(req);
    }
    else {
        await getMimeTypeFromUrl(req.body.img)
            .then(
                response => {
                    if (!response.startsWith('image')) {
                        throw new Error("La URL no es una imagen valida.");
                    }
                }
            )
            .catch(error => {
                throw error;
            });
            return req.body.img
    }
}
exports.deleteImg = async (fileName) => {
    if (fileName.startsWith('img') && fs.existsSync(filePath(fileName))) {
        fs.unlink(filePath(fileName),
            (err) => {
                if (err) throw new Error('No existe la ruta!');
            }
        );
    }
}



/*exports.loadImg = (product) => {
    try {
       const fileType = product.img.substring(product.img.lastIndexOf('.')+1);
        const img = fs.readFileSync(path.join(path.resolve(__dirname,'..'),'img', product.img));
        const imgBase64 = Buffer.from(img).toString('base64');
        return "data:image/" + fileType + ";base64," + imgBase64;
    } catch (error) {
        throw error;
    }
}*/