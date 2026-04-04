console.log("Proyecto iniciado");
console.log('Aplicación iniciada');

// Referencia al elemento canvas del HTML
const canvas = document.getElementById('canvas');
// Contexto 2D utilizado para dibujar sobre el canvas
const ctx = canvas.getContext('2d');
// Tamaño de cada celda de la cuadrícula
const gridSize = 15;
// Margen para dejar espacio a las escalas numéricas
const margin = 40;
/**
 * Limpia completamente el canvas antes de volver a dibujar.
 */
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}