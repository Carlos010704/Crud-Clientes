import { rows } from "mssql";
import {
  getConnection,
  Pool,
  querys,
  releaseConnection,
} from "../database/export";

export const Controller = {
  // RESTABLECER CONTRASEÑA DESDE LA PLATAFORMA

  resetPass: async (req, res) => {
    let client;

    try {
      const { password, email } = req.body;
      console.log(email);

      client = await getConnection();
      const result = await client.query(querys.resetPass, [password, email]);

      res.status(200).json("Constraseña actualizada con exito...");
    } catch (error) {
      console.error("Error al actualizar contraseña...:", error);
      res.status(500).send("No se pudo actualizar la contraseña...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  //Obtener Permisos por rol

  getPermissions: async (req, res) => {
    let client;

    try {
      const { value, url } = req.body;

      const rol = value.rol_id;

      client = await getConnection();
      const result = await client.query(querys.getPermissions, [rol, url]);

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error al obtener permisos...:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  // ----- USUARIOS ----

  getUsers: async (req, res) => {
    let client;

    try {
      client = await getConnection();
      const result = await client.query(querys.getUsers);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  getUser: async (req, res) => {
    let client;

    try {
      const paramID = req.params["id"];

      if (paramID == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.getUser, [paramID]);

        res.status(200).json(result.rows);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  userSave: async (req, res) => {
    let client;

    try {
      const { name, email, password, status, rol } = req.body.data;
      // const { key } = req.body.key

      if (name == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.userSave, [
          name,
          email,
          password,
          status,
          rol,
        ]);

        res.status(200).json("Usuario creado con exito...");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).send("No se pudo crear el usuario...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  userUpdate: async (req, res) => {
    let client;

    try {
      const { id, name, email, password, status, rol } = req.body.data;

      if (name == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.userUpdate, [
          name,
          email,
          password,
          status,
          rol,
          id,
        ]);

        res.status(200).json("Usuario actualizado con exito...");
      }
    } catch (error) {
      if (error.constraint == "email_unique") {
        console.error("Error : Un usuario ya cuenta con ese correo", error);
        res.status(500).send("Un usuario ya cuenta con ese correo...");
      } else {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send("No se pudo actualizar el usuario");
      }
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  userDelete: async (req, res) => {
    let client;

    try {
      const { id } = req.body;

      client = await getConnection();
      const result = await client.query(querys.userDelete, [id]);

      res.status(200).json("Usuario eliminado con exito...");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).send("No se pudo eliminar el usuario...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  // -------------- ROLES -----------------

  getRols: async (req, res) => {
    let client; // Variable para almacenar la conexión

    try {
      client = await getConnection(); // Obtener una conexión del pool
      const result = await client.query(querys.getRols); // Realizar la consulta

      res.status(200).json(result.rows); // Enviar la respuesta al cliente
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  getRol: async (req, res) => {
    let client;

    try {
      const paramID = req.params["id"];

      if (paramID == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.getRol, [paramID]);

        res.status(200).json(result.rows);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  groupSave: async (req, res) => {
    let client; // Variable para almacenar la conexión

    try {
      const { desc } = req.body;

      if (desc == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection(); // Obtener una conexión del pool
        const result = await client.query(querys.groupSave, [desc]); // Realizar la consulta

        res.status(200).json("Grupo creado con exito..."); // Enviar la respuesta al cliente
      }
    } catch (error) {
      console.error("Error crear el grupo:", error);
      res.status(500).send("No se pudo crear el rol...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  groupUpdate: async (req, res) => {
    let client;

    try {
      const { desc, id } = req.body;

      if (desc == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.groupUpdate, [desc, id]);

        res.status(200).json("Grupo actualizado con exito...");
      }
    } catch (error) {
      console.error("Error al actualizar el grupo:", error);
      res.status(500).send("No se pudo actualizar el grupo...");
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  groupDelete: async (req, res) => {
    let client;

    try {
      const { id } = req.body;

      client = await getConnection();
      const result = await client.query(querys.groupDelete, [id]);

      res.status(200).json("Grupo eliminado con exito...");
    } catch (error) {
      console.error("Error al eliminar el grupo:", error);
      res
        .status(500)
        .send(
          "Error al eliminar, el grupo se encuentra asociado a un usuario..."
        );
    } finally {
      // Asegúrate de liberar la conexión, independientemente de si hay un error o no
      if (client) {
        releaseConnection(client);
      }
    }
  },

  getViewPerm: async (req, res) => {
    let client;

    try {
      const paramID = req.params["id"];

      if (paramID == null) {
        return res.status(400).send("Por favor llenar los campos...");
      } else {
        client = await getConnection();
        const result = await client.query(querys.getViewPerm, [paramID]);

        res.status(200).json(result.rows);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se pudo realizar la petición...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },

  updateViewPerm: async (req, res) => {
    let client;
  
    try {
      const { id, values } = req.body;
      let permisosAct = [];
  
      if (!Array.isArray(values)) {
        return res.status(400).json("Error al actualizar permisos");
      } else {
        client = await getConnection();
  
        for (const perm of values) {
          const result = await client.query(querys.updatePermView, [
            id,
            perm.name_view,
            perm.perm_access,
            perm.perm_insert,
            perm.perm_update,
            perm.perm_delete,
            perm.perm_admin,
          ]);
          permisosAct.push(perm);
        }

        res.status(200).json({ msj: 'Permisos actualizados correctamente', value: permisosAct});
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      res.status(500).send("No se puedo actualizar permisos...");
    } finally {
      if (client) {
        releaseConnection(client);
      }
    }
  },
  
};
