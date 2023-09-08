// Importaciones de módulos necesarios
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const CryptoJS = require("crypto-js");

// Importación de las funciones de registro e ingreso desde módulos externos
const registro = require("./registro");
const ingreso = require("./ingreso");

// Carga de las variables privadas desde un archivo .env
require("dotenv").config();

// Configuración de middleware para manejar datos JSON y formularios URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Ruta para la autenticación de usuario (Ingreso)
app.post("/api/user/Ingreso", async (request, respond) => {
    try {
        // Obtener credenciales de la solicitud
        const contraseña = request.body.password;
        const usuario = request.body.usuario;

        // Calcular el hash de la contraseña proporcionada
        const hash = CryptoJS.SHA256(contraseña);
        const hashString = hash.toString(CryptoJS.enc.Hex);

        // Verificar las credenciales con la función "ingreso"
        const ingresoExitoso = await ingreso(process.env.urldemongodb, usuario, hashString);

        if (ingresoExitoso) {
            // Si el ingreso es exitoso, firmar un token de autenticación y enviarlo en la respuesta
            const token = jwt.sign({ usuario }, process.env.passwordtoken, { expiresIn: "5h" });
            respond.send({ success: true, message: "Ingreso exitoso", token });
        } else {
            // Si las credenciales son incorrectas, responder con un código de estado 401 (No Autorizado)
            respond.status(401).send({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (e) {
        console.log(e);
        // En caso de error en el servidor, responder con un código de estado 500 (Error Interno del Servidor)
        respond.status(500).send({ success: false, message: "Error en el servidor" });
    }
});

// Ruta para el registro de nuevos usuarios
app.post("/api/user/Registro", async (request, respond) => {
    try {
        // Obtener datos del nuevo usuario desde la solicitud
        const NuevoUsuario = request.body.NuevoUsuario;
        const NuevaContraseña = request.body.NuevaContraseña;
        const ConfirmacionContraseña = request.body.ConfirmacionContraseña;

        if (NuevaContraseña === ConfirmacionContraseña) {
            // Calcular el hash de la nueva contraseña
            const hash = CryptoJS.SHA256(NuevaContraseña);
            const hashString = hash.toString(CryptoJS.enc.Hex);

            // Registrar al nuevo usuario utilizando la función "registro"
            const registroExitoso = await registro(process.env.urldemongodb, NuevoUsuario, hashString);

            if (registroExitoso) {
                // Si el registro es exitoso, responder con un mensaje de éxito
                respond.send({ success: true, message: "Registro exitoso" });
            } else {
                // En caso de error al registrar el usuario, responder con un código de estado 500 (Error Interno del Servidor)
                respond.status(500).send({ success: false, message: "Error al registrar usuario" });
            }
        } else {
            // Si las contraseñas no coinciden, responder con un código de estado 400 (Solicitud Incorrecta)
            respond.status(400).send({ success: false, message: "Las contraseñas no coinciden" });
        }
    } catch (e) {
        console.log(e);
        // En caso de error en el servidor, responder con un código de estado 500 (Error Interno del Servidor)
        respond.status(500).send({ success: false, message: "Error en el servidor" });
    }
});

// Ruta para obtener tokens de autorización
app.get("/api/user/me", gettoken, (request, respond) => {
    try {
        // Si la verificación del token es exitosa, responder con los datos del usuario
        respond.send({ data: request.user });
    } catch (e) {
        console.log(e);
        // En caso de error en el servidor, responder con un código de estado 500 (Error Interno del Servidor)
        respond.status(500).send({ success: false, message: "Error en el servidor" });
    }
});

// Puerto en el que se ejecutará el servidor
const puerto = process.env.puerto || 8080;

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(puerto, () => {
    console.log("Servidor en ejecución en el puerto:", puerto);
});

// Función para obtener el token de autorización
function gettoken(req, res, next) {
    const bearer = req.headers["authorization"];

    if (!bearer) {
        // Si no se proporciona un token de autorización, responder con un código de estado 401 (No Autorizado)
        res.status(401).send({ success: false, message: "Token de autorización no proporcionado" });
    }

    const token = bearer.split(" ")[1];

    // Verificar el token de autorización utilizando la clave especificada en el archivo .env
    jwt.verify(token, process.env.passwordtoken, (error, data) => {
        if (error) {
            // Si el token es inválido, responder con un código de estado 401 (No Autorizado)
            res.status(401).send({ success: false, message: "Token de autorización inválido" });
        } else {
            // Si la verificación del token es exitosa, pasar los datos del usuario a la siguiente función de middleware
            req.user = data;
            next();
        }
    });
}
