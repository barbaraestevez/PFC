//La idea es tener el menor código posible.
// Arrancar servidor y poco más
console.log("Lo primero de todo, ¿cómo están esos máquinas?");

const express = require('express');
const connectDB = require ('./config/db');
const cors = require('cors');

const app = express();

app.use(express.json({limit:'10mb'}));
app.use(cors());

app.use('/api/products',require('./routes/product')); //especificamos el middleware. Nos sirve para importar el código que hay en products.js
//acceso al directorio img (1)
// app.use('/img', express.static( path.join(__dirname,'img' )));

connectDB();

//(1) Para hacer el acceso, se comentan las líneas del app.get
app.get('/',(req,res)=>{
    console.log("Aloha!");
    next();
})

app.listen(4000,()=>{
    console.log('El servidor está corriendo correctamente');
})