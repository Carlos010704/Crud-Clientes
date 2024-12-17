import {
  getConnection,
  Pool,
  querys,
  releaseConnection,
} from "../database/export";

import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import * as CryptoJS from "crypto-js";
import "../variables/global";
import { sendMail } from "./sendEmail";
import { log } from "console";

export const ControllerLogin = {
  onLogin: async (req, res) => {
    let client;

    try {
      const { mail, pass } = req.body;

      if (mail == null || pass == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.onLogin, [mail, pass]);

        if (result.rows != "") {
          const usuario = result.rows[0];

          if (usuario.status == 0) {
            console.error("Error : Usuario inactivo...");
            res.status(500).send("El usuario se encuentra inactivo...");
          } else {
            const token = crypto.randomBytes(16).toString("hex");
            const tokenJWT = jwt.sign(
              { usuario_id: usuario.id, correo: usuario.email },
              token,
              { expiresIn: 60 }
            );

            variableGlobal.token = tokenJWT; // Guardamos el token en una variable para validarlo.
            res.status(200).json({ access_token: tokenJWT });
          }
        } else {
          console.error("Error : Correo y/o contraseña incorrectos...");
          res.status(500).send("Correo y/o contraseña incorrectos...");
        }
      }
    } catch (error) {
      console.error("Error : Correo y/o contraseña incorrectos...");
      res.status(500).send("Correo y/o contraseña incorrectos...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  tokenValidate: async (req, res) => {
    const { token } = req.body;

    if (token == variableGlobal.token) {
      res.status(200).json({ status: true });
    } else {
      res.status(200).json({ status: false });
    }
  },

  getMail: async (req, res) => {
    let client;

    try {
      const { mail } = req.body;

      if (mail == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.sendMail, [mail]);

        if (result.rows != "") {
          sendMail(mail, res);
        } else {
          console.error("Error : Debe ingresar un correo valido");
          res.status(500).send("Debe ingresar un correo valido...");
        }
      }
    } catch (error) {
      console.error("Error : Debe ingresar un correo valido...");
      res.status(500).send("Debe ingresar un correo valido...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  getRolUser: async (req, res) => {
    let client;

    try {
      const { mail } = req.body;

      if (mail == null) {
        console.error("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.getRolUser, [mail]);
        
        res.status(200).send(result.rows);        
      }
    } catch (error) {
      console.error("Error : Al obtener el rol del usuario");
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },
};
