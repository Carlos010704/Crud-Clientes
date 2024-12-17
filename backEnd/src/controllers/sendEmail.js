import nodemailer from "nodemailer";
import * as CryptoJS from "crypto-js";
import {
  getConnection,
  Pool,
  querys,
  releaseConnection,
} from "../database/export";

// Función para enviar correos electrónicos
function sendMail(mail, res) {
  
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password_new = '';
  const longitud = 16;

  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    password_new += caracteres.charAt(indiceAleatorio);
  }


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CORREO_RECUPERACION,
      pass: process.env.PASS_CORREO_RECUPERACION,
    },
  });

  const mailOptions = {
    from: process.env.CORREO_RECUPERACION,
    to: mail,
    subject: "Recuperación de Contraseña",
    text: `Tu nueva contraseña es: ${password_new}`,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      res.status(500).send("Error al enviar el correo electrónico...");
    } else {
      console.log("Correo electrónico enviado:", info.response);
      updatePassword(mail, password_new, res)
    }
  });
}

async function updatePassword(mail, password, res){
    let client;
    
    try {

      const encryptedData = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      client = await getConnection();
      const result = await client.query(querys.resetPass, [encryptedData, mail]);

      res.status(200).json('Correo enviado con exito...');
    
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
}

module.exports = { sendMail };
