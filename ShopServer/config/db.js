const mongoose = require('mongoose');
require ('dotenv').config() //.config({path:'nombreDelArchivo.env'}); //si el archivo creado no tiene nombre, es sólo .env sólo se pone .config(), mientras que si tiene nombre hay que indicarle la ruta. p.ej.: .config({path:'nombreDelArchivo.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO)
    } catch (error) {

    }
}

/*
/-> Si un proyecto usa una versión antigua de MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,
            {
                useNewUrlparser: true,
                useUnifiedTopology: true
            })
    } catch (error) {

    }
}
*/