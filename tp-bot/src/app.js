// app.js es donde configuro el servidor Express, los middlewares, para que 
// entienda el formato json y le dice que rutas usar

// app.js es donde configuro el servidor Express, los middlewares y las rutas
const express = require('express');
const app = express();

app.use(express.json());

const { procesarMovimiento } = require('./move');
app.post('/move', procesarMovimiento);

app.get('/', (req, res) => {
    res.json({ mensaje: "¡Servidor del juego responde con exito!" });
});

module.exports = app;