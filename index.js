// express nos ayuda con las config iniciales
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config'; // cuando subimos el código a production, me permite procesar variables de entorno.
import productoRouter from './src/routes/productos.routes.js';
import usuariosRouter from './src/routes/usuarios.routes.js';
import './src/database/database.js';
import path from 'path'
import { fileURLToPath } from 'url';// permite indicarle el camino donde esta el index. 



// nuestro backend lo vamos a dividir en 3 partes:

// 1- configuraciones iniciales
// usar express descargamos todo express en app
const app = express();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
// crear una variable con express 
// PORT hace referencia al numero de puerto que me dan en el servidor de producción.
// como no tenemos uno, con el or lo mandamos a que inicia en el 4000.
app.set('port', process.env.PORT || 4000);

// chequeo que funcione en el puerto o variable que setteo con el método .listen()
// .listen() : tiene dos parámetros
// 1- la variable app.set('port').
// 2- el callback la function en este caso una function anónima con un log.
app.listen(app.get('port'), () => {
  console.log('hey listen ' + app.get('port'));
})

// 2- middlewares (funciones de js:funciones que le dan una habilidad/tarea especifica a mi backend)
// IMPORTANTE: los MIDDLEWARES se agregan antes de las rutas.

app.use(cors());// permite conexiones remotas.
app.use(express.json()) // permite interpretar datos en formato json.
app.use(express.urlencoded({ extended: true })) // ayuda a interpretar datos del body del request (ejemplo: string)
app.use(morgan('dev')) // nos da mas información en la terminal.
// Agregar un archivo estático (tengo q indicarle donde esta el index.html para ello usamos el path)
// __dirname: indica la ruta donde esta ubicado el index.html
// console.log(path.join(__dirname, '/public'));
// app.use(express.static(path.join('G:\RollingCode\Modulo4-Backend\05-backendCafecito', '/public'))
// app.use(express.static(path.join())
app.use(express.static(path.join(_dirname, '/public')));



// 3- crear las rutas
// rutas: lugar que yo voy a inventarme o crearme para que el frontend haga una solicitud 
// el back la procesa y le doy una respuesta. 
// http://localhost:4000/api/producto
app.use('/api', productoRouter)

// http://localhost:4000/api/usuarios
app.use('/api/auth', usuariosRouter)


// APUNTES
// en package.json:  agregamos  "type": "module",
// IMPORTANTE: si no ponemos el "type": "module", nos tira un error enorme.
// si queremos usar el import y el export utilizamos el "type": "module
// sino tendremos que utilizar el required()
// esto nos permite ya no utilizar la palabra required('algo)

// npm install -g nodemon
// agregamos en package.json: "dev": "nodemon --exec node index.js"
// npm run dev agregamos el comando de desarrollo.
// npm run dev reemplaza el npm start.

// con el object  process accedemos a las variables de entornos.

// express: framework que nos ofrece una serie de herramientas para construir el back de forma mas rápida y eficiente.

// nodemon: me permite ver los cambios a tiempo real, reiniciando el servidor y lo compila nuevamente.

// Comandos
// npm run start: este solo se ejecuta cuando lo mando a deploy a mi back
// npm run dev: para ejecutar desde local