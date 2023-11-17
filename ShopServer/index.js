//La idea es tener el menor código posible.
// Arrancar servidor y poco más
console.log("Lo primero de todo, ¿cómo están esos máquinas?");

const express = require('express');
const connectDB = require ('./config/db');

connectDB();