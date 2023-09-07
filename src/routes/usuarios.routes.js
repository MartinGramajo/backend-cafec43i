import { Router } from "express"; // herramienta para crear rutas 
import { crearUsuario, listarUsuarios, login } from "../controllers/usuarios.controllers.js";

const router = Router();

// método route para crear una ruta
// el método POST es para hacer el login
router.route('/').post(login).get(listarUsuarios)
router.route('/nuevo').post(crearUsuario);

export default router;

