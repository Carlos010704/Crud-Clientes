import { Router } from "express";
import { Controller } from "../controllers/general.controller";
import { ControllerLogin } from "../controllers/login.controller";


// CREAR LAS RUTAS
const router = Router();

// SERVICIO DE LOGIN
router.post('/onLogin', ControllerLogin.onLogin);
router.post('/tokenValidate', ControllerLogin.tokenValidate);
router.post('/resetPass', Controller.resetPass);

router.post('/sendEmail', ControllerLogin.getMail);

router.post('/getRolUser', ControllerLogin.getRolUser);
router.post('/getPermissions', Controller.getPermissions);


// -------  GRUPOS  --------
router.get('/groups', Controller.getRols);
router.get('/group/:id?', Controller.getRol);
router.post('/group-save', Controller.groupSave);
router.post('/group-update', Controller.groupUpdate);
router.post('/group-delete', Controller.groupDelete);

// -------- USUARIOS ---------
router.get('/users', Controller.getUsers);
router.get('/user/:id?', Controller.getUser);
router.post('/user-save', Controller.userSave);
router.post('/user-update', Controller.userUpdate);
router.post('/user-delete', Controller.userDelete);

// -------- Obtener permisos para la vista --------
router.get('/getViewPermissions/:id?', Controller.getViewPerm);
router.post('/updatePermissions', Controller.updateViewPerm);


export default router;
