console.log("Proyecto iniciado");
console.log('Aplicación iniciada');

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
}
/**
 * Limpia completamente el canvas antes de volver a dibujar.
 */
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width,canvas.height);

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
// Configuración del texto de escalas
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';

    // Dibujar escala horizontal
    let escalaX = 0;

    for (let x = margin; x <= canvas.width - margin; x += gridSize) {
        ctx.fillText(escalaX, x - 5, canvas.height - margin + 20);
        escalaX++;
    }
   // Dibujar escala vertical
    let escalaY = 0;

    for (let y = canvas.height - margin; y >= margin; y -= gridSize) {
        ctx.fillText(escalaY, margin - 25, y + 5);
        escalaY++;
    }   
      // Configurar color de los ejes
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

