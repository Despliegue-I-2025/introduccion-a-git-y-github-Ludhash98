//move.js es quien recibe las peticiones http , ej cuando alguien
//envie una orden  de movimiento por la API . ejecutara la logica correspondiente

const {decidirMovimientoBot,obtenerMisFichas} = require('./estrategia');

function procesarMovimiento(req, res){
const {jugador,dado,tablero} = req.body;

if(!jugador ||!tablero){
return res.status(400).json({
error:"Faltan jugador o tablero"
});
}
const fichas = obtenerMisFichas(tablero,jugador);

const respuesta = {};

for(const ficha of fichas){
respuesta[ficha] = decidirMovimientoBot();
}
res.json(respuesta);
}


module.exports = {
procesarMovimiento
};