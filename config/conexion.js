const mongoose = require("mongoose");

// Conexión con MongoDB

mongoose.connect(process.env.MONGO_DB_URI)


.then(() => {
    console.log("Conectado a MongoDB");
})
.catch((error) => {
    console.log("Error al conectar:", error);
});

module.exports = mongoose;
