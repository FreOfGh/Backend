// registro.js

const mongoose = require("mongoose");
const Usuario = require("./Modelos/modeloUsuarioApuntado"); // Asegúrate de tener la ruta correcta

module.exports = async function (url, usuarioCliente, contraseñaCliente) {
  try {
    await mongoose.connect(url);
    console.log("Base de datos cargada correctamente");

    // Consulta todos los documentos de la colección usuarios
    const usuarios = await Usuario.find({usuario:usuarioCliente});

    // Imprime los documentos en la consola
    console.log("Documentos de la colección usuarios:");
    
    if (usuarios.length >0 ){
        console.log(usuarios)
        const contraseñaCorrecta = usuarios.some((usuario) => {
        return usuario.contraseña === contraseñaCliente;
        });
        
        if (contraseñaCorrecta) {
            return(true);
         } else {
            return(false);
        }
        } else {
          console.log("No existen documentos para el usuario especificado.");
        }

    // Cierra la conexión a la base de datos
    mongoose.connection.close();
  } catch (error) {
    console.error("Error al cargar la base de datos o mostrar usuarios:", error);
  }
};
