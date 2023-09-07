import { Router } from "express"; // herramienta para crear rutas 
import { borrarProducto, crearProductos, editarProducto, listarProductos, obtenerProducto } from "../controllers/productos.controllers.js";

const router = Router();

// método route para crear una ruta
// se puede hacer todas las solicitudes pero no se pueden repetir
router.route('/producto').get(listarProductos).post(crearProductos);
router.route('/producto/:id').put(editarProducto).delete(borrarProducto).get(obtenerProducto);

export default router;