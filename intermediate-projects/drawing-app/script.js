const canvas = document.getElementById('drawingCanvas')
const ctx = canvas.getContext('2d')
const customCursor = document.getElementById('customCursor')

let drawing = false
let brushColor = '#000000'
let brushSize = 5

document.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.pageX}px`
  customCursor.style.top = `${e.pageY}px`
  customCursor.style.display = 'block'
})

document.addEventListener('mouseleave', () => {
  customCursor.style.display = 'none'
})

canvas.addEventListener('mousedown', (e) => {
  drawing = true
  ctx.beginPath()
  ctx.moveTo(e.offsetX, e.offsetY)
  customCursor.style.opacity = '0.5'
})

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.stroke()
  }
})

canvas.addEventListener('mouseup', () => {
  drawing = false
  ctx.closePath()
  customCursor.style.opacity = '1'
})

document.getElementById('colorPicker').addEventListener('input', (e) => {
  brushColor = e.target.value
})

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value
})

document.getElementById('clearButton').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

document.getElementById('saveButton').addEventListener('click', () => {
  const link = document.createElement('a')
  link.download = 'drawing.png'
  link.href = canvas.toDataURL()
  link.click()
})
