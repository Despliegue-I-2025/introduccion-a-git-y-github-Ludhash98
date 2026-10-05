const test = require('node:test');
const assert = require('node:assert');
const { dimensionTablero, calcularMovimientoToroidal, crearTableroInicial } = require('./tablero');

test('El tablero debe tener una dimensión de 10x10', () => {
  assert.strictEqual(dimensionTablero, 10);
});

test('El movimiento toroidal debe envolver los bordes correctamente', () => {
  // Si estoy en el borde izquierdo (x = 0) y me muevo hacia el oeste ("O"), debo aparecer en el borde opuesto (x = 9)
  const posicionFinal = calcularMovimientoToroidal(0, 0, "O", 1);
  assert.strictEqual(posicionFinal.x, 9);
  assert.strictEqual(posicionFinal.y, 0);
});

test('El tablero inicial debe posicionar las bases de los jugadores y casas neutrales', () => {
  const tablero = crearTableroInicial(1234);
  
  // Verificar dimensiones de la matriz
  assert.strictEqual(tablero.length, 10);
  assert.strictEqual(tablero[0].length, 10);

  // Verificar posiciones fijas de los jugadores
  assert.strictEqual(tablero[0][0], "A1");
  assert.strictEqual(tablero[9][9], "B1");
});