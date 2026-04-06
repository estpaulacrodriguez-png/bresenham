// Referencia al elemento canvas del HTML
const canvas = document.getElementById('canvas');
// Contexto 2D utilizado para dibujar sobre el canvas
const ctx = canvas.getContext('2d');
// Tamaño de cada celda de la cuadrícula
const gridSize = 25;
// Margen para dejar espacio a las escalas numéricas
const margin = 50;
/**
 * Limpia completamente el canvas antes de volver a dibujar.
 */
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Color de las líneas de la cuadrícula
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;


     // Dibujar líneas verticales de la cuadrícula
    for (let x = margin; x <= canvas.width - margin; x += gridSize) {
        // Iniciar una nueva línea
        ctx.beginPath();

        // Posición inicial de la línea
        ctx.moveTo(x, margin);

        // Posición final de la línea
        ctx.lineTo(x, canvas.height - margin);

        // Dibujar la línea en pantalla
        ctx.stroke();
    }

       // Dibujar líneas horizontales de la cuadrícula
    for (let y = margin; y <= canvas.height - margin; y += gridSize) {
        // Iniciar una nueva línea
        ctx.beginPath();

        // Punto inicial de la línea
        ctx.moveTo(margin, y);

        // Punto final de la línea
        ctx.lineTo(canvas.width - margin, y);

        // Dibujar la línea
        ctx.stroke();
    }
   // Color utilizado para las escalas numéricas
    ctx.fillStyle = 'black';

    // Fuente utilizada para mostrar los números
    ctx.font = '12px Arial';

    // Variable que representa el valor de la escala
    let escala = 0;

    // Dibujar números en la parte inferior del canvas
    for (let x = margin; x <= canvas.width - margin; x += gridSize) {
        // Mostrar el valor de la escala debajo de cada columna
        ctx.fillText(escala, x - 5, canvas.height - margin + 20);

        // Incrementar el valor de la escala
        escala++;
    }
   // Reiniciar la variable de escala para el eje Y
    escala = 0;

    // Dibujar los números sobre el lado izquierdo del canvas
    for (let y = canvas.height - margin; y >= margin; y -= gridSize) {
        // Mostrar el valor correspondiente al nivel de altura
        ctx.fillText(escala, margin - 25, y + 5);

        // Incrementar la escala
        escala++;
    }
  // Cambiar el color de los ejes principales
    ctx.strokeStyle = 'black';

    // Hacer que los ejes sean más gruesos
    ctx.lineWidth = 2;

    // Iniciar el trazado de los ejes
    ctx.beginPath();

    // Dibujar eje vertical
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, canvas.height - margin);

    // Dibujar eje horizontal
    ctx.lineTo(canvas.width - margin, canvas.height - margin);

    // Mostrar los ejes en pantalla
    ctx.stroke();
}
/**
 * Dibuja un punto en la cuadrícula.
 * @param {number} x Coordenada X.
 * @param {number} y Coordenada Y.
 */
function plot(x, y) {
    // Convertir coordenada X
    const canvasX = margin + (x * gridSize);

    // Convertir coordenada Y
    const canvasY = canvas.height - margin - (y * gridSize);

    // Color del punto
    ctx.fillStyle = 'red';

    // Dibujar el punto
    ctx.fillRect(canvasX - 4, canvasY - 4, 8, 8);
}

function bresenham(x0, y0, x1, y1, plot) {
    // Diferencia absoluta entre las coordenadas en X
    let dx = Math.abs(x1 - x0);

    // Diferencia absoluta entre las coordenadas en Y
    let dy = Math.abs(y1 - y0);

    // Dirección de avance en X
    let sx = (x0 < x1) ? 1 : -1;

    // Dirección de avance en Y
    let sy = (y0 < y1) ? 1 : -1;

    // Variable de error utilizada por Bresenham
    let err = dx - dy;

    // Obtener la referencia de la tabla
    const tabla = document.getElementById('tablaPasos');

    // Limpiar la tabla antes de volver a dibujar
    tabla.innerHTML = '';

    // Variable para numerar cada paso
    let paso = 1;

      // Ciclo principal que se ejecuta hasta llegar al punto final
    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        // Multiplicar el error por 2 para evaluar movimientos
        let e2 = 2 * err;

        // Agregar fila a la tabla
        tabla.innerHTML += `
            <tr>
                <td>${paso}</td>
                <td>${x0}</td>
                <td>${y0}</td>
                <td>${err}</td>
                <td>${e2}</td>
            </tr>
        `;

        // Incrementar el número de paso
        paso++;
       // Finalizar cuando se alcance el último punto
        if (x0 === x1 && y0 === y1) {
            break;
        }

        // Ajustar el desplazamiento horizontal
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajustar el desplazamiento vertical
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

/**
 * Obtiene las coordenadas del formulario y dibuja la línea.
 */
function dibujarLinea() {
    // Obtener coordenadas ingresadas
    const x0 = parseInt(document.getElementById('x0').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y1 = parseInt(document.getElementById('y1').value);

    // Redibujar la cuadrícula
    drawGrid();

    // Ejecutar Bresenham
    bresenham(x0, y0, x1, y1, plot);
}
// Obtener referencia del botón de dibujar
const boton = document.getElementById('btnDibujar');

// Ejecutar la función dibujarLinea al hacer clic
boton.addEventListener('click', dibujarLinea);

// Dibujar la cuadrícula apenas cargue la página
drawGrid();