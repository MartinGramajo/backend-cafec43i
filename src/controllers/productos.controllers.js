

// mi function listarProductos tiene 2 parámetros: 
// req: request --> pedido del usuario
// res: response --> respuesta al pedido del usuario

// IMPORTANTE: al momento de importar la function 
// SI O SI tiene que tener la extension .js

// mongo es una db no relacional, no sql. 

import Producto from "../models/producto.js";

// IMPORTANTE: si es el metodo es POST siempre tenemos que enviar los HEADERS!


export const crearProductos = async (req, res) => {
  try {
    // ir a la db y pedir los productos
    // Aqui los datos deberian estar validados
    console.log(req.body);
    const productoNuevo = new Producto(req.body);
    // guardar el productoNuevo en la base de datos
    await productoNuevo.save();
    // mandamos el status de la base de datos
    res.status(201).json({
      mensaje: 'El producto fue creado correctamente'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: 'el producto no pudo ser creado'
    })
  }
}

// PUT
export const editarProducto = async (req, res) => {
  try {
    // EXTRAER EL PARÁMETRO ID DE LA RUTA
    // Modificamos un producto existente con el metodo findbyidandupdate()
    // pasamos el id y en body los datos nuevos para editar.
    await Producto.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
      mensaje: 'El producto fue MODIFICADO correctamente'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: 'No se pudo editar el producto'
    })
  }
}

// DELETE
export const borrarProducto = async (req, res) => {
  try {
    // EXTRAER EL PARÁMETRO ID DE LA RUTA
    // Modificamos un producto existente con el método findByIdAndDelete().
    // IMPORTANTE: el método REMOVE NO SE USA!!!!!!!!!
    // pasamos el id para borrar.
    const productoBorrado = await Producto.findByIdAndDelete(req.params.id)
    if (productoBorrado === null) {
      res.status(400).json({
        mensaje: 'El id no existe'
      })
    } else {
      res.status(200).json({
        mensaje: 'El producto fue BORRADO correctamente'
      })

    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: 'No se pudo borrar el producto'
    })
  }
}

// obtener un producto
export const obtenerProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findById(req.params.id)

    res.status(200).json(productoBuscado)
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: 'No se pudo obtener el producto'
    })
  }
}

// GET 
export const listarProductos = async (req, res) => {
  try {
    // ir a la db y pedir los productos
    // metodo find del model para traer toda la collection
    const productos = await Producto.find();
    // por json le pasamos el array de productos
    // IMPORTANT: ESE DATO VIAJA EN EL BODY DE LA RESPUESTA.
    res.status(200).json(productos)

  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: 'Error al buscar productos'
    })
  }
}

//NOTA:
// HEADERS: solo cuando mando datos por el body.