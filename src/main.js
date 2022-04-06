const cells = Array.from(document.querySelectorAll('.cell'));
const enemyCells = cells.slice(0, 30);
const playerCells = cells.slice(30);
const displayScore = document.querySelector('.score');

let score, speed, dropCount;

reset();

document.addEventListener('keydown', (e) => {
  if (!dropCount) {
    startGame();
  }
  const player = document.querySelector('.player');

  if (
    e.key == 'ArrowRight' &&
    playerCells.includes(player.parentElement.nextElementSibling)
  ) {
    player.parentElement.nextElementSibling.appendChild(player);
  }

  if (
    e.key == 'ArrowLeft' &&
    playerCells.includes(player.parentElement.previousElementSibling)
  ) {
    player.parentElement.previousElementSibling.appendChild(player);
  }
});

function reset() {
  dropCount = 0;
  speed = 1000;
  score = 0;
  displayScore.innerHTML = '0';

  cells.forEach((cell) => (cell.innerHTML = ''));
  playerCells[1].innerHTML = `<div class="player"><div class="imgPlayer"></div></div>`;
}

function startGame() {
  reset();
  gameLoop();
}

function gameLoop() {
  let gameStopped = false;

  for (let i = enemyCells.length - 1; i >= 0; i--) {
    const cell = enemyCells[i];

    const nearCell = cells[i + 3];

    const enemy = cell.children[0];

    if (!enemy) {
      continue;
    }

    nearCell.appendChild(enemy);

    if (playerCells.includes(nearCell)) {
      if (nearCell.querySelector('.player')) {
        gameStopped = true;
      } else {
        score++;
        speed = Math.max(100, speed - 25);
        displayScore.innerHTML = score;
        enemy.remove();
      }
    }
  }

  if (dropCount % 2 === 0) {
    let enemyImg = [
      'enemy01',
      'enemy02',
      'enemy03',
      'enemy04',
      'enemy05',
      'enemy06',
    ];

    let randomPick = enemyImg[Math.floor(Math.random() * enemyImg.length)];
    let imgUrl = `./src/assets/${randomPick}.png`;
    const position = Math.floor(Math.random() * 3);
    enemyCells[
      position
    ].innerHTML = `<div class="enemy"><div style="background-image:url(${imgUrl})";  class="imgEnemy"></div></div>`;
  }

  if (gameStopped) {
    alert(`Your points: ${score}`);
    reset();
  } else {
    dropCount++;
    setTimeout(gameLoop, speed);
  }
}
