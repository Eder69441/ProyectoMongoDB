require("dotenv").config();
const express = require("express");


require("./config/conexion");

//RUTAS
const rutasContactos = require("./routes/contactos");

const app = express();

const PORT = 3000;


app.set("view engine", "ejs");
app.set("views", "./views");

// Leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Usar las Rutas
app.use(rutasContactos);

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});