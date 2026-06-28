const express = require("express");

const router = express.Router();

//Controlador
const contactoController = require("../controllers/contactoController");

//Ruta mostrar contactos
router.get("/", contactoController.listarContactos);

//RuTa mostrar formularios
router.get("/agregar", contactoController.mostrarFormulario);

//Ruta guardar contactos
router.post("/guardar", contactoController.guardarContacto);

//Ruta editar contactos
// Mostrar formulario editar
router.get(
    "/editar/:id",
    contactoController.editarFormulario
);

// Ruta actualizar contacto
router.post(
    "/actualizar/:id",
    contactoController.actualizarContacto
);

// Ruta eliminar contacto
router.get(
    "/eliminar/:id",
    contactoController.eliminarContacto
);

//Ruta formulario de llamadas
router.get(
    "/llamadas/:id",
    contactoController.formularioLlamadas
);

//Ruta guardar llamada
router.post(
    "/guardarLlamada/:id",
    contactoController.guardarLlamada
);

//Imprimir información de contacto
router.get(
    "/reporte/:id",
    contactoController.generarPDF
);

module.exports = router;