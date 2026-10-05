//server.js el archivo que enciende el servidor  y pone a escuchar en un 
//puerto ej puerto 3000.  importando lo configurado en ap.js

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

console.log(process.argv)