const { default: mongoose } = require("mongoose")
const {default: validator} = require("validator")
let esquema = new mongoose.Schema(
    {
        usuario :{
            type: String,
            required: true,
            unique: true,

        },
        contraseña: {
            type: String,
            required: true,
        }

    }
)
module.exports = mongoose.model("Usuarios",esquema);