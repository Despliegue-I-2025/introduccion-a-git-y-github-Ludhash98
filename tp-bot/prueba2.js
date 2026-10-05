const readline = require('readline');

// Interfaz para lectura manual con teclado
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 1. TABLERO (10x10)
let matriz = Array.from({ length: 10 }, () => Array(10).fill(0));

// Lista de coordenadas de las fichas del jugador 'a1' (Inicia con 1 en [9,0])
let fichasA1 = [[9, 0]];

// 2. GENERADOR DETERMINISTA (LCG) Y DADO
let semilla = 12345;

function aleatorio() {
  semilla = (semilla * 9301 + 49297) % 233280;
  return semilla / 233280;
}

function lanzarDado(min, max) {
  return Math.floor(aleatorio() * (max - min + 1)) + min;
}

// 3. GENERACIÓN DE 5 CASAS NEUTRALES ('n')
let casasEnTablero = 0;
while (casasEnTablero < 5) {
  let x = lanzarDado(0, 9);
  let y = lanzarDado(0, 9);

  if (matriz[y][x] === 0 && !(y === 9 && x === 0)) {
    matriz[y][x] = "n";
    casasEnTablero++;
  }
}

// BUSCAR LA CASA 'n' MÁS CERCANA (Tablero Toroidal)
function obtenerCasaMasCercana(filaBot, colBot) {
  let mejorCasa = null;
  let menorDistancia = Infinity;

  for (let f = 0; f < 10; f++) {
    for (let c = 0; c < 10; c++) {
      if (matriz[f][c] === "n") {
        let distFila = Math.min(Math.abs(f - filaBot), 10 - Math.abs(f - filaBot));
        let distCol = Math.min(Math.abs(c - colBot), 10 - Math.abs(c - colBot));
        let distanciaTotal = distFila + distCol;

        if (distanciaTotal < menorDistancia) {
          menorDistancia = distanciaTotal;
          mejorCasa = [f, c];
        }
      }
    }
  }
  return mejorCasa;
}

// REDIBUJAR TABLERO
function actualizarTablero() {
  // Limpiar fichas anteriores
  for (let f = 0; f < 10; f++) {
    for (let c = 0; c < 10; c++) {
      if (matriz[f][c] === 'a1') {
        matriz[f][c] = 0;
      }
    }
  }

  // Dibujar 'a1' en cada posición individual
  for (let [f, c] of fichasA1) {
    matriz[f][c] = 'a1';
  }
}

// 4. ESTADO DEL JUEGO
let turnoActual = 1;
let casasConquistadas = 0;

actualizarTablero();
console.log("=== INICIO DEL JUEGO ===");
console.log("Objetivo: Conquistar 3 casas 'n' o completar 25 turnos.");
console.log("Las fichas adicionales nacen separadas en [9,0]. Presiona ENTER para avanzar.\n");
console.table(matriz);

// 5. LÓGICA DE TURNO (SIN SUPERPOSICIONES)
function ejecutarTurno() {
  if (casasConquistadas >= 3) {
    console.log(`\n=======================================================`);
    console.log(` ¡VICTORIA! Se conquistaron ${casasConquistadas} casas en ${turnoActual - 1} turnos.`);
    console.log(`=======================================================`);
    rl.close();
    return;
  }

  if (turnoActual > 25) {
    console.log(`\n=======================================================`);
    console.log(` FIN DEL JUEGO: Límite de 25 turnos alcanzado.`);
    console.log(` Casas conquistadas: ${casasConquistadas}/3`);
    console.log(`=======================================================`);
    rl.close();
    return;
  }

  let pasos = lanzarDado(1, 3);
  let nuevasPosiciones = [];
  let nacieronNuevasFichas = 0;

  for (let i = 0; i < fichasA1.length; i++) {
    let [f, c] = fichasA1[i];
    let objetivo = obtenerCasaMasCercana(f, c);

    if (objetivo) {
      let [objFila, objCol] = objetivo;

      if (f !== objFila) {
        let bajar = (objFila - f + 10) % 10;
        let subir = (f - objFila + 10) % 10;
        if (bajar <= subir) f = (f + pasos) % 10;
        else f = (f - pasos + 10) % 10;
      } else if (c !== objCol) {
        let derecha = (objCol - c + 10) % 10;
        let izquierda = (c - objCol + 10) % 10;
        if (derecha <= izquierda) c = (c + pasos) % 10;
        else c = (c - pasos + 10) % 10;
      }
    }

    // SI LA CASILLA YA ESTÁ OCUPADA POR OTRA FICHA A1, SE UBICA AL LADO
    let estaOcupada = nuevasPosiciones.some(([nf, nc]) => nf === f && nc === c);
    if (estaOcupada) {
      let desvíos = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (let [df, dc] of desvíos) {
        let altF = (f + df + 10) % 10;
        let altC = (c + dc + 10) % 10;
        let vecinaOcupada = nuevasPosiciones.some(([nf, nc]) => nf === altF && nc === altC);
        if (!vecinaOcupada) {
          f = altF;
          c = altC;
          break;
        }
      }
    }

    // Detectar conquista
    if (matriz[f][c] === "n") {
      casasConquistadas++;
      nacieronNuevasFichas++;
      matriz[f][c] = 0;
      console.log(`\n¡¡¡ TURNO ${turnoActual}: Ficha ${i + 1} CONQUISTÓ una casa 'n' !!!`);
    }

    nuevasPosiciones.push([f, c]);
  }

  // Las fichas nuevas nacen en [9,0] o en la casilla adyacente libre más cercana
  for (let k = 0; k < nacieronNuevasFichas; k++) {
    let baseF = 9, baseC = 0;
    while (nuevasPosiciones.some(([nf, nc]) => nf === baseF && nc === baseC)) {
      baseC = (baseC + 1) % 10;
    }
    nuevasPosiciones.push([baseF, baseC]);
    console.log(`-> Nació una nueva ficha 'a1' al lado en la posición [${baseF}, ${baseC}]`);
  }

  fichasA1 = nuevasPosiciones;
  actualizarTablero();

  console.log(`\n--- TURNO ${turnoActual} de 25 ---`);
  console.log(`Dado de Pasos: ${pasos} | Fichas en Juego: ${fichasA1.length} | Conquistadas: ${casasConquistadas}/3`);
  console.table(matriz);

  turnoActual++;
  pedirEnter();
}

function pedirEnter() {
  rl.question('Presiona ENTER para el siguiente turno...', () => {
    ejecutarTurno();
  });
}

pedirEnter();