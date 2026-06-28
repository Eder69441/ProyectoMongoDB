const Contacto = require("../models/Contacto");
const PDFDocument = require("pdfkit");

//Mostrar Contactos
exports.listarContactos = async (req, res) => {

    try {

        const contactos = await Contacto.find();
        res.render("index", {
            contactos
        });

    } catch (error) {
        console.log(error);
        res.send("Error al obtener contactos");
    }

};

//Mostrar Formualrio
exports.mostrarFormulario = (req, res) => {
    res.render("agregar");
};

//Guardar Contacto
exports.guardarContacto = async (req, res) => {
    try {
        await Contacto.create(req.body);
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.send("Error al guardar");
    }

};

//Editar formulario
exports.editarFormulario = async (req, res) => {

    try {
        const contacto = await Contacto.findById(req.params.id);
        res.render("editar", {
            contacto
        });

    } catch (error) {
        console.log(error);
        res.send("Error al buscar contacto.");
    }

};

//Actualizar contactos
exports.actualizarContacto = async (req, res) => {

    try {
        await Contacto.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.send("Error al actualizar.");
    }

};

//Eliminar contactos
exports.eliminarContacto = async (req, res) => {

    try {
        await Contacto.findByIdAndDelete(req.params.id);
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.send("Error al eliminar.");
    }
};

//Mostrar formulario de llamadas
exports.formularioLlamadas = async (req, res) => {

    try {
        const contacto = await Contacto.findById(req.params.id);
        res.render("llamadas", {
            contacto
        });

    } catch (error) {

        console.log(error);
        res.send("Error al cargar el contacto.");
    }

};

//Guardar llamadas
exports.guardarLlamada = async (req, res) => {

    try {
        await Contacto.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    llamadas: {
                        fecha: req.body.fecha,
                        motivo: req.body.motivo,
                        quien: req.body.quien
                    }
                }
            }
        );

        res.redirect("/llamadas/" + req.params.id);

    } catch (error) {
        console.log(error);
        res.send("Error al guardar la llamada.");

    }

};

//Imprimir PDF
exports.generarPDF = async (req, res) => {

    try {

        const contacto = await Contacto.findById(req.params.id);

        const doc = new PDFDocument();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename=Contacto_${contacto.nombre}.pdf`
        );

        doc.pipe(res);

        doc
            .fontSize(22)
            .text("AGENDA TELEFÓNICA", {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(16)
            .text("DATOS DEL CONTACTO");

        doc.moveDown();
        doc.text(`Nombre: ${contacto.nombre}`);
        doc.text(`Apellido: ${contacto.apellido}`);
        doc.text(`Correo: ${contacto.correo}`);
        doc.text(`Tipo de sangre: ${contacto.tipoSangre}`);
        doc.text(`Cédula: ${contacto.cedula}`);

        doc.text(
            `Fecha de nacimiento: ${new Date(contacto.fechaNacimiento).toLocaleDateString("es-DO")}`
        );

        doc.moveDown();

        doc
            .fontSize(16)
            .text("HISTORIAL DE LLAMADAS");
        doc.moveDown();

        if (contacto.llamadas.length === 0) {

            doc.text("No existen llamadas registradas.");

        } else {

            contacto.llamadas.forEach((llamada, index) => {

                doc.fontSize(12);
                doc.text(`Llamada #${index + 1}`);
                doc.text(
                    `Fecha: ${new Date(llamada.fecha).toLocaleDateString("es-DO")}`
                );

                doc.text(`Motivo: ${llamada.motivo}`);
                doc.text(`Realizada por: ${llamada.quien}`);
                doc.moveDown();
            });

        }

        doc.end();

    } catch (error) {
        console.log(error);
        res.send("Error al generar el PDF.");
    }

};