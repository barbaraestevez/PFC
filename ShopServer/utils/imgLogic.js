// Módulo de utilidades (imgLogic) que contiene funciones relacionadas con la manipulación de imágenes y la lógica asociada.

// Importa el módulo 'image-size' para obtener las dimensiones de una imagen
const base64ToImage = require('image-size');

// Importa el módulo 'fs' para trabajar con el sistema de archivos
const fs = require('fs');


// Importa el módulo 'path' para trabajar con rutas de archivos
const path = require('path');

// Define la función 'filePath' que genera la ruta completa de un archivo en la carpeta 'img'
const filePath = (param) => path.join(path.resolve(__dirname, '..'), 'img', param);

// Función para validar si la cadena base64 es una imagen válida y cumple con ciertos criterios
function validateBase64Image(base64String) {
    try {
        if (!base64String.startsWith('data:image/')) {
            throw new Error('Formato de imagen no válido.');
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

// Función para obtener el tipo de contenido (MIME) desde una URL
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
        })
        .catch(error => {
            throw new Error('URL no válida');
        });
}

// Función para guardar un archivo de imagen en el sistema de archivos
function saveImgFile(req) {
    const base64String = req.body.img;

    const buffer = Buffer.from(base64String.split(',')[1], 'base64');

    const fileType = base64String.split(';')[0].split('/')[1];
    const fileName = `img${Date.now()}.${fileType}`;

    fs.writeFile(filePath(fileName), buffer, (error) => { throw new Error('Error al guardar la imagen.') });

    return fileName;
}

// Función para cargar una imagen desde el sistema de archivos y convertirla a base64
exports.loadImg = (product) => {
    try {
        const img = fs.readFileSync(filePath(product.img));

        const imgBase64 = Buffer.from(img).toString('base64');

        return "data:image/" + product.img.split('.')[1] + ";base64," + imgBase64;

    } catch (error) {
        return "https://sloanreview.mit.edu/wp-content/uploads/2012/03/fail-flickr-Jez-Page-500.jpg";
    }
}

// Función principal para procesar una imagen (validar, guardar o verificar MIME desde una URL)
exports.processImg = async (req) => {
    if (req.body.isLocalFile) {
        const base64String = req.body.img;
        validateBase64Image(base64String);
        return saveImgFile(req);
    } else {
        await getMimeTypeFromUrl(req.body.img)
            .then(
                response => {
                    if (!response.startsWith('image')) {
                        throw new Error("La URL no es una imagen válida.");
                    }
                }
            )
            .catch(error => {
                throw error;
            });
        return req.body.img;
    }
}

// Función para eliminar un archivo de imagen del sistema de archivos
exports.deleteImg = async (fileName) => {
    if (fileName.startsWith('img')) {
        fs.unlink(filePath(fileName),
            (err) => {
                if (err) throw new Error('No existe la ruta!');
            }
        );
    }
}
//  && fs.existsSync(filePath(fileName))

// Explicación detallada:
//
// Importación de Módulos:
//
// Se importan los módulos necesarios como 'image-size', 'fs', y 'path'.
// Definición de Funciones:
//
// filePath: Función que genera la ruta completa de un archivo en la carpeta 'img'.
// validateBase64Image: Función para validar si una cadena base64 es una imagen válida y cumple con ciertos criterios.
// getMimeTypeFromUrl: Función para obtener el tipo de contenido(MIME) desde una URL.
// saveImgFile: Función para guardar un archivo de imagen en el sistema de archivos.
// Exportación de Funciones:
//
// Se exportan funciones específicas que se pueden utilizar desde otros archivos.Estas funciones incluyen loadImg, processImg, y deleteImg, que están relacionadas con la manipulación y gestión de imágenes.
// En resumen, este módulo proporciona funciones útiles para trabajar con imágenes, incluyendo la validación de imágenes base64, la obtención del tipo de contenido desde una URL, la carga de imágenes desde el sistema de archivos, el procesamiento y almacenamiento de imágenes, y la eliminación de archivos de imagen.