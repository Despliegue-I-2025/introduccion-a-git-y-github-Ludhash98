let matriz = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["j1", 0, 0, 0, 0, 0, 0, 0, 0,"j2"] // PRIMER IDEA VISUAL TABLA 10 *10 , PLANO CARTESIANO//
];

/*console.log(matriz[0][0]);*//  // 1ER INICIO DE PRUEBA NO GENERA//

let semilla = 12345;

function dado() {
  semilla = (semilla * 9301 + 49297) % 233280;
  return semilla / 233280;  // ALGORITMO LCG, CODIGO UNIVERSAL, BRINDA 0 Y 1  CON DECIMALES//
}

let casas = 0  // CREAMOS VARIABLE PARA INDICAR EL INICIO DE LAS CASAS//

while (casas <5) {
    let x = Math.floor (dado () * 10); //  TOMA EL NUMERO DE LA SEMILLA ALEATORIA CONVIRTIENDOLO EN ENTERO. 
    let y = Math.floor (dado () * 10); // *10 EL TOTAL DEL TABLERO 
    if (matriz [y][x] === 0) {
        matriz [y][x] = "c";
        casas = casas + 1;   //CREAMOS LA CONDICION, MENOR A 5 CASAS, LE INDICAMOS EL ESPACIO DONDE NO
                             //NO PUEDEN IR.   AVISANDO QUE SI LOS ESPACIOS ES IGUAL A 0  SE COLOCA "C" DE CASAS, 
    } 
}
console.table (matriz);

/*let tiradaDado = 1 + Math.floor(dado() * 3);

console.log("El dado dio:", tiradaDado);       // solo da numero 3 iNTENTO FALLIDO 






/*function tiradedado() {
    semilla = (semilla * 9301 + 49297) % 233280;
    return semilla / 233280; 
  }

  function tiradedado() {
    let resultado = 1 + Matchfloor(dado()*3);
    return resultado;
}
let pasos = (tiradedado());
console.log(pasos);*/              // no se pudo concretar INTENTO FALLIDO (SE BUSCA  CONSEGUIR EL TOTAL DE 3 NUM ALEATORIO )

let num= Math.random();
let num2= num*3;
let DadoMovimiento= Math.ceil(num2);
console.log(DadoMovimiento); //  brinda el mov del jugador (1, 2, 3) 

