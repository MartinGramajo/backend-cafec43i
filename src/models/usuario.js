import mongoose, { Schema } from "mongoose";

// const con nombre de un esquema es una plantilla
const usuarioSchema = new Schema({
  nombreUsuario: {
    // tipo de dato
    type: String,
    // es requerido? 
    required: true,
    // propiedad para hacer unica la propiedad
    unique: true,
    // caracteres maximos requeridos
    maxLength: 30,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
    // minLength: 4,
    // maxLength: 8,
  },
});

// vamos a generar un modelo 
// REGLAS: 
// se lo coloca con la primera LETRA EN MAYUS.
// el string debe ir en singular xq la db le agrega una s al final, ejemplo 'Producto', 
// la db lo transforma el 'Productos'.
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;