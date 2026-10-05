const dimensionTablero = 10;
 
// FUNCION PARA CALCULAR MOVIMIENTO TOROIDAL (PAC-MAN) //
function calcularMovimientoToroidal (x, y, direccion) {
    let dx = 0;
    let dy = 0;  

    // DETERMINAMOS EL DESPLAZAMIENTO SEGUN LA DIRECCION RECIBIDA //
    if (direccion === "N") dy = -1; // MOVER HACIA ARRIBA 
    if (direccion === "S") dy = 1;  // MOVER HACIA ABAJO
    if (direccion === "E") dx = 1;  // MOVER A LA DERECHA
    if (direccion === "O") dx = -1; // MOVER A LA IZQUIERDA

    // APLICAMOS FORMULA MATEMATICA DEL MODULO PARA ENVOLVER LOS BORDES //
    const nuevaX = (x + dx + dimensionTablero) % dimensionTablero;
    const nuevaY = (y + dy + dimensionTablero) % dimensionTablero;

    return { x: nuevaX, y: nuevaY };
} 

// GENERADOR PSEUDOALEATORIO DETERMINISTA CON SEMILLA //
function crearGeneradorseed(semilla) {
    let estado = semilla;
    return function () {
        estado = (estado * 1664525 + 10113904223) % 4294967296;
        return estado / 4294967296; // valor entre 0 y 1 //
    };
}

// ESTADO INICIAL DEL TABLERO 10X10 //
function crearTableroInicial(seed) {
    const tablero = Array.from({ length: dimensionTablero }, () =>
        Array(dimensionTablero).fill("")
    );

    // POSICIONAMOS LAS CASAS INICIALES DE LOS JUGADORES EN ESQUINAS OPUESTAS //
    tablero[0][0] = "A1"; // JUGADOR A INICIA EN ESQ SUPERIOR IZQUIERDA
    tablero[9][9] = "B1"; // JUGADOR B INICIA EN ESQ INFERIOR DERECHA

    // CREAMOS UN GENERADOR DETERMINISTA CON SEMILLA SEED //
    const random = crearGeneradorseed(seed);

    // CANTIDAD DE CASAS NEUTRALES (N) //
    const cantidadCasas = 5;

    for (let i = 0; i < cantidadCasas; i++) {
        const x = Math.floor(random() * dimensionTablero);
        const y = Math.floor(random() * dimensionTablero);

        // EVITAMOS PISAR LAS POSICIONES DE JUGADORES O VOLVER A PISAR OTRA CASA
        if ((x === 0 && y === 0) || (x === dimensionTablero - 1 && y === dimensionTablero - 1) || tablero[y][x] === "N") {
            i--; // Si la celda está ocupada, repetimos este intento
            continue;
        }

        tablero[y][x] = "N"; // N = casa neutral
    }

    return tablero;
}

// Exportamos las funciones para poder usarlas con Jest
module.exports = { calcularMovimientoToroidal, crearTableroInicial };



//====JSON======
// 1. Creamos el tablero con una semilla
const semillaPrueba = 1234;
const miTablero = crearTableroInicial(semillaPrueba);
console.table(miTablero);

// 2. Lo convertimos AUTOMÁTICAMENTE a formato JSON
const jsonDelJuego = JSON.stringify(miTablero, null, 2);

// 3. Lo imprimimos en la consola para ver el resultado en formato JSON
console.log("--- ESTADO DEL JUEGO EN JSON ---");
console.log(jsonDelJuego);

// Exportamos las funciones por si usas Jest

module.exports = { calcularMovimientoToroidal };

console.log(process.argv);