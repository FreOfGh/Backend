module.exports = async function (url, usuarioCliente, contraseñaClinte) {
    const modeloUsuario = require("./Modelos/modeloUsuarioApuntado");
    const mongodb = require("mongoose");
  
    try {
      await mongodb.connect(url);
      console.log("Base de datos cargada correctamente");
  
      const nuevoUsuario = new modeloUsuario({
        usuario: usuarioCliente,
        contraseña: contraseñaClinte,
      });
  
      await nuevoUsuario.save();
      console.log("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al cargar la base de datos o registrar usuario:", error);
    }
    
  };
  