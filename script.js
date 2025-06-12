const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

const rows = 8;
const cols = 8;
const cellWidth = canvas.width / cols;
const cellHeight = canvas.height / rows;

let turn = 0; // 0: 黒, 1: 白
const board = Array.from({ length: rows }, () => Array(cols).fill(null));

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row <= rows; row++) {
    ctx.beginPath();
    ctx.moveTo(0, row * cellHeight);
    ctx.lineTo(canvas.width, row * cellHeight);
    ctx.stroke();
  }

  for (let col = 0; col <= cols; col++) {
    ctx.beginPath();
    ctx.moveTo(col * cellWidth, 0);
    ctx.lineTo(col * cellWidth, canvas.height);
    ctx.stroke();
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c]) {
        drawStone(c, r, board[r][c]);
      }
    }
  }
}

function drawStone(col, row, color) {
  const centerX = col * cellWidth + cellWidth / 2;
  const centerY = row * cellHeight + cellHeight / 2;
  const radius = Math.min(cellWidth, cellHeight) / 2 - 5;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const col = Math.floor(x / cellWidth);
  const row = Math.floor(y / cellHeight);

  if (board[row][col] === null) {
    board[row][col] = turn === 0 ? 'black' : 'white';
    turn = 1 - turn;
    drawGrid();
  }
});

drawGrid();
