export const querys = {

    onLogin: "SELECT status FROM ptf.users WHERE email = $1 AND password = $2" ,   // Inicio de sesion

    resetPass: "UPDATE ptf.users SET password = $1 WHERE email = $2" , // Restablecer contraseña

    sendMail: "SELECT password FROM ptf.users WHERE email = $1", // Enviar correo de recuperación de contraseña

    getRolUser: "SELECT rol_id FROM ptf.users WHERE email =  $1",

    getPermissions: "SELECT perm_access, perm_insert, perm_update, perm_delete, perm_admin FROM ptf.permissions WHERE rol_id = $1 AND name_view = $2",

    getViewPerm: "SELECT name_view, perm_access, perm_insert, perm_update, perm_delete, perm_admin FROM ptf.permissions WHERE rol_id = $1",

    updatePermView: "UPDATE ptf.permissions SET perm_access = $3, perm_insert = $4, perm_update = $5, perm_delete = $6, perm_admin = $7 WHERE rol_id = $1 AND name_view = $2",

    getUsers: "SELECT * FROM ptf.users",

    getUser: "SELECT * FROM ptf.users WHERE id = $1",

    userSave: "INSERT INTO ptf.users(name, email, password, status, rol_id) VALUES ($1, $2, $3, $4, $5)",

    userUpdate: "UPDATE ptf.users SET name = $1, email = $2, password = $3, status = $4, rol_id = $5 WHERE id = $6",

    userDelete: "DELETE FROM ptf.users WHERE id = $1",

    getRols: "SELECT * FROM ptf.roles",

    getRol: "SELECT * FROM ptf.roles WHERE id = $1",

    groupSave: "INSERT INTO ptf.roles(description) VALUES($1)",

    groupUpdate: "UPDATE ptf.roles SET description = $1 WHERE id = $2",

    groupDelete: "DELETE FROM ptf.roles WHERE id = $1",

}