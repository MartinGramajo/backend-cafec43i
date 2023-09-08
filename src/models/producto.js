import mongoose, { Schema } from "mongoose";

// const con nombre de un esquema es una plantilla
const productoSchema = new Schema({
  nombreProducto: {
    // tipo de dato
    type: String,
    // es requerido? 
    required: true,
    // propiedad para hacer unico un nombre 
    unique: true,
    // caracteres minimos requeridos 
    minLength: 2,
    // caracteres maximos requeridos
    maxLength: 50,
  },

  precio: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
  imagen: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  }
});

// vamos a generar un modelo 
// se lo coloca con la primera Mayuscula (buenas practicas)
// el string debe ir en singular xq la db le agrega una s al final, ejemplo 'Producto'
const Producto = mongoose.model('producto', productoSchema);

export default Producto;