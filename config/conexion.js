const mongoose = require("mongoose");

// Conexión con MongoDB
mongoose.connect("mongodb://ederling91:8494997343@mongo.ia3x.com:27017/?authSource=")
.then(() => {
    console.log("Conectado a MongoDB");
})
.catch((error) => {
    console.log("Error al conectar:", error);
});

module.exports = mongoose;
