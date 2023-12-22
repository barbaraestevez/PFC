const { ObjectId } = require('mongodb');
const connectCollection = require('../config/mongo');
const authLogic = require('../utils/authLogic');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    service: 'Gmail',
    auth: {
        user: 'mistest659@gmail.com',
        pass: 'Admin.1234'
    }
})

exports.sendEmail = (req, res) => {
    const { destinatario, asunto, mensaje } = req.body;
    const mailOptions = {
        from: 'mistest659@gmail.com',
        to: destinatario,
        subject: asunto,
        text: mensaje
    }
    transporter.sendMail(mailOptions, (err,info) => {
        if(err) {
            console.err(err);
            res.status(500).send("Error al enviar")
        }
        else {
            res.send("Correo enviado con éxito");
        }
    })
}