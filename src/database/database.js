// se puede llamar database.js configdb 
// mongoose permite conectarme y hacer transacciones con mi db

import mongoose from "mongoose";
import 'dotenv/config';

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)


const datosConexion = mongoose.connection;


datosConexion.once('open', () => {
  console.log('BD conectada');
})