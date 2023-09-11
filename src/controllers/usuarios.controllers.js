import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

// verificaciones
//verificar si existe el mail
//verificar si el usuario que encontre tiene la misma contraseña que recibi en body

export const login = async (req, res) => {
  try {
    //verificar si existe un mail como el recibido
    const { email, password } = req.body;

    //verificar si el email ya existe
    // let usuario = await Usuario.findOne({ email: req.body.email });
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }
    //desencriptar y comparar password
    // comparar password de body.
    // usuario.password es el dato encriptado.
    // si son iguales retorna un true caso contrario false.

    const passwordValido = bcrypt.compareSync(password, usuario.password)
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: 'Correo o password invalido - password'
      })
    }

    //responder que el usuario es correcto
    // se pueden agregar todos los datos para mandar.
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombre,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    //verificar si el email ya existe
    let usuario = await Usuario.findOne({ email }); //devulve un null
    console.log(usuario);
    if (usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }
    //guardamos el nuevo usuario en la BD
    usuario = new Usuario(req.body);

    console.log(usuario);
    // guardar el usuario en la BD con la pass encriptada
    // bcrypt me pide un salt un código para encriptar 
    // genSaltSync agrega el async a la function 
    // el 10 es la cantidad de vuelta para generar el salt 
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();
    res.status(201).json({
      mensaje: "usuario creado",
      nombre: usuario.nombre,
      uid: usuario._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    //buscar en la BD la collection de productos
    const usuarios = await Usuario.find();
    //envio la respuesta al frontend
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar los usuarios",
    });
  }
};


// verificar si existe el mail
// verificar si el usuario q encontré tiene la misma contraseña que recibí en el body
// enviarle un 400 si el usuario o el password esta incorrecto.
// si todo esta es ok le contestamos con un 200 que esta todo ok


// export const login = async (req, res) => {
//   try {
//     //verificar si existe un mail como el recibido
//     const { email, password } = req.body;

//     //verificar si el email ya existe
//     // let usuario = await Usuario.findOne({ email: req.body.email });
//     let usuario = await Usuario.findOne({ email });
//     if (!usuario) {
//       //si el usuario existe
//       return res.status(400).json({
//         mensaje: "Correo o password invalido - correo",
//       });
//     }
//     //desencriptar y comparar password

//     //responder que el usuario es correcto
//     res.status(200).json({
//       mensaje: "El usuario existe",
//       uid: usuario._id,
//       nombre: usuario.usuario,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       mensaje: "usuario o contraseña invalido",
//     });
//   }
// };

// export const crearUsuarios = async (req, res) => {
//   try {
//     // ir a la db y pedir los productos
//     // Aqui los datos deberian estar validados
//     console.log(req.body);
//     const usuarioNuevo = new Usuario(req.body);
//     // guardar el productoNuevo en la base de datos
//     await usuarioNuevo.save();
//     // mandamos el status de la base de datos
//     res.status(201).json({
//       mensaje: 'El usuario fue registrado correctamente'
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       mensaje: 'el usuario no pudo ser registrado'
//     })
//   }
// }


// export const listarUsuarios = async (req, res) => {
//   try {
//     // ir a la db y pedir los productos
//     // metodo find del model para traer toda la collection
//     const usuarios = await Usuario.find();
//     // por json le pasamos el array de productos
//     // IMPORTANT: ESE DATO VIAJA EN EL BODY DE LA RESPUESTA.
//     res.status(200).json(usuarios)

//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       mensaje: 'Error al buscar usuarios'
//     })
//   }
// }