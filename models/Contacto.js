const mongoose = require("mongoose");

// Esquema de llamadas
const llamadaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    quien: {
        type: String,
        required: true
    }
});

// Esquema de contactos
const contactoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    tipoSangre: {
        type: String,
        required: true
    },

    cedula: {
        type: String,
        required: true,
        unique: true
    },

    fechaNacimiento: {
        type: Date,
        required: true
    },

    llamadas: [llamadaSchema]

});

// Crear el modelo
module.exports = mongoose.model("Contacto", contactoSchema);