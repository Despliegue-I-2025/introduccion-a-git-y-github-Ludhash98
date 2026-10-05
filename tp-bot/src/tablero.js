//Creacion de tablero 10x10 toroidal- se implementa usando la funcion del modulo (posicion actual+posicion deseada+ tamaño del tablero) % tamaño del tablero

const dimensionTablero = 10; //Se define como constante (fijo) el tamaño del tablero

//Creamos una funcion para calcular movimientos en el tablero que hagan que la ficha pase al otro lado

function calcularMovimientoToroidal(x,y,direccion,pasos = 1) {
    //Determinamos desplazamiento segun la direccion que reciba
 let dx = 0;
 let dy = 0;
 if (direccion === "N") dy = -1; // Mover hacia arriba (resta en Y)
 if (direccion === "S") dy = 1;  // Mover hacia abajo (suma en Y)
 if (direccion === "E") dx = 1;  // Mover a la derecha (suma en X)
 if (direccion === "O") dx = -1; // Mover a la izquierda (resta en X)

 //Aplicamos la formula del modulo para envolver os bordes
 
const nuevaX =
(x + dx * pasos + dimensionTablero)% dimensionTablero;
 
const nuevaY = (y + dy * pasos + dimensionTablero)% dimensionTablero;
  return { x: nuevaX, y: nuevaY };
}


// Generador pseudoaleatorio determinista con semilla
function crearGenerador(seed) {
  let estado = seed;
  return function() {
    estado = (estado * 1664525 + 1013904223) % 4294967296;
    return estado / 4294967296; // valor entre 0 y 1
  };
}

//definimos semilla determinista 

const seed = 1234; //usamos el valor 1234 para laa semilla

//La fx calcularMovimientoToroidal nos da el comportamiento del tablero, ahora procedemos a la creacion del estado inicial del tablero

function crearTableroInicial(seed) {
  //Creamos una matriz 10x10 llena de cadenas vacias (fill("") sirve para hacer eso en el codigo)
  const tablero = Array.from({ length : dimensionTablero }, () => 
    Array(dimensionTablero).fill("")
  );
 //Posicionamos las casas iniciales de los jugadores en cada extremo correspondiente del tablero
 tablero[0][0]= "A1"; //A en el extremo superior izquierdo
 tablero[9][9]= "B1";//B en el extremo inferior derecho

 //Creamos un generador determinista con semilla(seed)
 const random = crearGenerador(seed);

 //Cantidad de casas neutrales (N)
 const cantidadCasas = 5;

 for (let i = 0; i < cantidadCasas; i++) {
    let x, y;

    // Genera coordenadas hasta encontrar una celda válida
    do {// la estructura do...while asegura que el bucle se ejecute al menos una vez antes de evaluar la condicion para continuar o detenerse
      x = Math.floor(random() * dimensionTablero);
      y = Math.floor(random() * dimensionTablero);
    } while ( //repite el bucle si la celda elegida no cumple con las siguientes condiciones
      (x === 0 && y === 0) || // evita casa jugador A
      (x === dimensionTablero - 1 && y === dimensionTablero - 1) || // evita casa jugador B
      tablero[y][x] === "N" // evita pisar otra casa neutral
    );

    tablero[y][x] = "N"; // N = casa neutral
  }

 return tablero

}

//Este console.log se usa pra pruebas locales, si quiero probar algo localmente, lo descomento. 
//NOTA: Al ser un bot stateless, crearTableroInicial(seed) nunca se ejecuta, pero me sirve a mi para ver el tablero a nivel local.
//console.table(crearTableroInicial(seed));

// Exportamos las funciones y la constante para que puedan ser utilizadas en otros módulos
module.exports = {
  dimensionTablero,
  calcularMovimientoToroidal,
  crearTableroInicial
};