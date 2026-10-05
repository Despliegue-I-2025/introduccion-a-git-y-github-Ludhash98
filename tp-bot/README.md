# TP-BOT
 
Trabajo práctico de Diseños y Arquitecturas de Despliegues I.
 
## Descripción
 
Este proyecto consiste en el desarrollo de un bot implementado en Node.js y Express.
 
El bot recibe el estado actual del tablero mediante una petición HTTP, analiza la información recibida y responde con una dirección de movimiento para cada una de sus fichas.
 
 
---
 
## Características implementadas
 
- Tablero toroidal de 10x10.
- Generación de tablero inicial con semilla determinista.
- Soporte para movimientos en las cuatro direcciones:
- Norte (N)
- Sur (S)
- Este (E)
- Oeste (O)
- Compatibilidad con desplazamientos de 1, 2 o 3 casillas, proprocionadas por el dado del arbitro.
- Bot stateless.
- API HTTP desarrollada con Express.
- Endpoint `/move` para recibir estados del juego y responder movimientos.
- Fixtures para pruebas locales.
 
---
 
## Estructura del proyecto
 
```text
TP-BOT
│
├─ fixtures
│ ├─ state1.json
│ └─ state2.json
│
├─ src
│ ├─ app.js
│ ├─ server.js
│ ├─ move.js
│ ├─ estrategia.js
│ └─ tablero.js
│
├─ diagnostico.js
├─ package.json
├package-lock.json
└─ README.md
```
 
---
 
 ## Replicación del entorno de desarrollo
 
Este proyecto puede ejecutarse en cualquier computadora que tenga instalado Node.js.
 
### 1. Clonar el repositorio
 
```bash
git clone URL_DEL_REPOSITORIO
```
 
### 2. Ingresar a la carpeta del proyecto
 
```bash
cd TP-BOT
```
 
### 3. Instalar las dependencias
 
```bash
npm install
```
 
Este comando instala automáticamente todas las dependencias definidas en `package.json` y recrea la carpeta `node_modules`.
 
### 4. Ejecutar la aplicación
 
```bash
npm start
```
 
### 5. Verificar el funcionamiento
 
Si la ejecución es correcta, la terminal mostrará:
 
```text
Servidor corriendo en http://localhost:3000
```
 
Luego se puede acceder desde un navegador a:
 
```text
http://localhost:3000
```
 
para comprobar que el servidor responde correctamente.
 
### Archivos necesarios para replicar el entorno
 
- `package.json`
- `package-lock.json`
 
---
 ## Endpoint disponible
 
### POST /move
 
Recibe un objeto JSON con:
 
```json
{
"jugador": "A",
"dado": 2,
"tablero": []
}
```
 
Y responde con las direcciones elegidas para las fichas del jugador:
 
```json
{
"A1": "N"
}
```

## Estrategia utilizada
 
La estrategia actual selecciona una dirección de movimiento de manera aleatoria entre las opciones válidas:
 
- Norte
- Sur
- Este
- Oeste
 
La lógica de decisión se encuentra implementada en el archivo `estrategia.js`.
 
---
 
## Pruebas
 
Para realizar pruebas locales se incluyen distintos estados de tablero dentro de la carpeta `fixtures`.
 
Estos archivos permiten verificar el comportamiento del bot, en nuestro caso por cuestiones de practicidad usamos la extención Thunder Client de Visual Studio Code para verificar dicho comportamiento.
 
---
 
## Tecnologías utilizadas
 
- Node.js
- Express
- JavaScript (CommonJS)
 
---
 
## Autores

- Daiana Lezcano.
- Ludmila Ramirez.