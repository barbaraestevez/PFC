// archivo de configuración de la base de datos (db) de tu aplicación Node.js con MongoDB.

// Importa el módulo 'mongoose' para interactuar con MongoDB
const mongoose = require('mongoose');

// Importa el módulo 'dotenv' para cargar variables de entorno desde un archivo '.env'
require('dotenv').config(); // Puedes especificar la ruta al archivo de configuración, por ejemplo, .config({ path: 'nombreDelArchivo.env' });

// Define una función asíncrona llamada 'connectDB' para establecer la conexión con la base de datos
const connectDB = async () => {
    try {
        // Intenta conectarse a la base de datos utilizando la URL proporcionada en la variable de entorno 'DB_MONGO'
        await mongoose.connect(process.env.DB_MONGO);

        // Imprime un mensaje en la consola si la conexión fue exitosa
        console.log('BBDD Conectada.');
    } catch (error) {
        // Manejo de errores: Imprime el error en la consola y termina el proceso con un código de error (1)
        console.log(error);
        process.exit(1);
    }
}
// Exporta la función 'connectDB' para que pueda ser utilizada en otros archivos
module.exports = connectDB;


// Explicación detallada:
//
// Importación de Módulos:
//
// Se importa mongoose para interactuar con la base de datos MongoDB.
// Se importa dotenv para cargar las variables de entorno desde un archivo.env.
// Configuración de Variables de Entorno:
//
// Se utiliza dotenv.config() para cargar las variables de entorno desde un archivo.env.Puedes especificar la ruta al archivo de configuración si es diferente.
// Función connectDB:
//
// Se define una función asíncrona llamada connectDB que se encargará de establecer la conexión con la base de datos.
// Intento de Conexión:
//
// Dentro de la función connectDB, se utiliza mongoose.connect para intentar conectarse a la base de datos utilizando la URL proporcionada en la variable de entorno DB_MONGO.
// Manejo de Errores:
//
// Si hay algún error durante la conexión, se maneja imprimiendo el error en la consola y terminando el proceso con process.exit(1).
// Exportación de la Función:
//
// Finalmente, se exporta la función connectDB para que pueda ser utilizada en otros archivos de la aplicación.
// Este archivo sirve como configuración para establecer la conexión con la base de datos MongoDB antes de que la aplicación comience a recibir solicitudes.