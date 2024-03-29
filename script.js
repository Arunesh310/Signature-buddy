const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontPicker = document.getElementById("fontPicker");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;


function getCoordinates(e) {
  let x, y;
  if (
    e.type === "mousedown" ||
    e.type === "mousemove" ||
    e.type === "mouseup"
  ) {
    x = e.offsetX;
    y = e.offsetY;
  } else if (
    e.type === "touchstart" ||
    e.type === "touchmove" ||
    e.type === "touchend"
  ) {
    const rect = canvas.getBoundingClientRect();
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  }
  return { x, y };
}


function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}


canvas.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
  const { x, y } = getCoordinates(e);
  isDrawing = true;
  lastX = x;
  lastY = y;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    const { x, y } = getCoordinates(e);
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("touchstart", (e) => {
  const { x, y } = getCoordinates(e);
  isDrawing = true;
  lastX = x;
  lastY = y;
});

canvas.addEventListener("touchmove", (e) => {
  if (isDrawing) {
    const { x, y } = getCoordinates(e);
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontPicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
