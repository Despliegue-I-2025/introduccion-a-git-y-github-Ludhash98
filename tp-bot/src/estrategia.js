function obtenerMisFichas(tablero, jugador) {
    const fichas = [];

    for (let y = 0; y < tablero.length; y++) {
        for (let x = 0; x < tablero[y].length; x++) {

            const celda = tablero[y][x];

            if (celda && celda.startsWith(jugador)) {
                fichas.push(celda);
            }
        }
    }

    return fichas;
}

function decidirMovimientoBot(tablero, jugador, ficha, dado) {

    const direcciones = [
        { nombre: "N", dy: -1, dx: 0 },
        { nombre: "E", dy: 0, dx: 1 },
        { nombre: "S", dy: 1, dx: 0 },
        { nombre: "O", dy: 0, dx: -1 }
    ];

    let posicionFicha = null;

    // Buscar la posición de la ficha
    for (let y = 0; y < tablero.length; y++) {
        for (let x = 0; x < tablero[y].length; x++) {

            if (tablero[y][x] === ficha) {
                posicionFicha = { x, y };
                break;
            }
        }
    }

    if (!posicionFicha) {
        return "N";
    }

    // Buscar todas las casas neutrales
    const casas = [];

    for (let y = 0; y < tablero.length; y++) {
        for (let x = 0; x < tablero[y].length; x++) {

            if (tablero[y][x] === "N") {
                casas.push({ x, y });
            }
        }
    }

    // Si no quedan casas neutrales, movimiento aleatorio
    if (casas.length === 0) {
        const random = Math.floor(Math.random() * 4);
        return direcciones[random].nombre;
    }

    let mejorDireccion = null;
    let mejorDistancia = Infinity;

    for (const direccion of direcciones) {

        // Movimiento toroidal
        const nuevoY =
            (posicionFicha.y + (direccion.dy * dado) + tablero.length)
            % tablero.length;

        const nuevoX =
            (posicionFicha.x + (direccion.dx * dado) + tablero[0].length)
            % tablero[0].length;

        // Si conquista una casa neutral, prioridad absoluta
        if (tablero[nuevoY][nuevoX] === "N") {
            return direccion.nombre;
        }

        let distanciaMinima = Infinity;

        for (const casa of casas) {

            const distancia =
                Math.abs(casa.x - nuevoX) +
                Math.abs(casa.y - nuevoY);

            if (distancia < distanciaMinima) {
                distanciaMinima = distancia;
            }
        }

        if (distanciaMinima < mejorDistancia) {
            mejorDistancia = distanciaMinima;
            mejorDireccion = direccion.nombre;
        }
    }

    if (mejorDireccion) {
        return mejorDireccion;
    }

    const random = Math.floor(Math.random() * 4);
    return direcciones[random].nombre;
}

module.exports = {
    decidirMovimientoBot,
    obtenerMisFichas
};