//La idea es tener el menor código posible.
// Arrancar servidor y poco más
console.log("Lo primero de todo, ¿cómo están esos máquinas?");

const express = require('express');
const connectDB = require ('./config/db');
const User = require('./models/User');
const cors = require('cors');

const app = express();

app.use(express.json({limit:'10mb'}));
app.use(cors({
    credentials:true // habilita añadir al encabezado las credenciales para más adelante poder trabajar con la base de datos.
}));

app.use('/api/products',require('./routes/product')); //especificamos el middleware. Nos sirve para importar el código que hay en products.js
//acceso al directorio img (1)
// app.use('/img', express.static( path.join(__dirname,'img' )));
app.use('/auth/user', require('./routes/user'));

connectDB();
User.createSchema();

//(1) Para hacer el acceso, se comentan las líneas del app.get
/*app.get('/',(req,res)=>{
    console.log("Aloha!");
    next();
})*/

app.listen(4000,()=>{
    console.log('El servidor está corriendo correctamente');
})