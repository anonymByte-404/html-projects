const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const customCursor = document.getElementById('customCursor');

let drawing = false;
let brushColor = '#000000';
let brushSize = 5;

// Update cursor position
document.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.pageX}px`;
  customCursor.style.top = `${e.pageY}px`;
  customCursor.style.display = 'block';
});

// Hide cursor when leaving the page
document.addEventListener('mouseleave', () => {
  customCursor.style.display = 'none';
});

// Start drawing
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  customCursor.style.opacity = '0.5'; // Make cursor slightly transparent when drawing
});

// Draw
canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.closePath();
  customCursor.style.opacity = '1'; // Restore cursor opacity
});

// Change brush color
document.getElementById('colorPicker').addEventListener('input', (e) => {
  brushColor = e.target.value;
});

// Change brush size
document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

// Clear canvas
document.getElementById('clearButton').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save drawing
document.getElementById('saveButton').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});
