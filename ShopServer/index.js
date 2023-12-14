//La idea es tener el menor código posible.
// Arrancar servidor y poco más
console.log("Lo primero de todo, ¿cómo están esos máquinas?");

const express = require('express');
const connectDB = require ('./config/db');
const User = require('./models/User');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const app = express();

app.use(express.json({limit:'10mb'}));
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true // habilita añadir al encabezado las credenciales para más adelante poder trabajar con la base de datos.
}));

app.use('/api/products',require('./routes/product')); //especificamos el middleware. Nos sirve para importar el código que hay en products.js
app.use('/auth/user', require('./routes/user'));
//acceso al directorio img (1)
//app.use('/img', express.static(path.join(__dirname, 'img' )));

connectDB();
User.createSchema();

//(1) Para hacer el acceso, se comentan las líneas del app.get
/*app.get('/',(req,res)=>{
    console.log("Aloha!");
    next();
})*/

app.listen(PORT,()=>{
    console.log('El servidor está corriendo correctamente');
})