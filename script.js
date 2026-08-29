let player = document.getElementById("player");
let enemies = document.querySelectorAll(".enemy");
let scoreText = document.getElementById("score");

let playerX = 180;

let enemyY = [0, -200, -400];
let enemyX = [50, 200, 320];

let speed = 5;
let score = 0;
let gameOver = false;


// プレイヤーを動かす
document.addEventListener("keydown", function(event) {

  if (gameOver) {
    return;
  }

  if (event.key === "ArrowLeft") {
    playerX = playerX - 20;
  }

  if (event.key === "ArrowRight") {
    playerX = playerX + 20;
  }

  // 左から出ない
  if (playerX < 0) {
    playerX = 0;
  }

  // 右から出ない
  if (playerX > 360) {
    playerX = 360;
  }

  player.style.left = playerX + "px";
});


// ゲームを動かす
function game() {

  if (gameOver) {
    return;
  }

  for (let i = 0; i < enemies.length; i++) {

    // 敵を下に動かす
    enemyY[i] = enemyY[i] + speed;

    enemies[i].style.top = enemyY[i] + "px";
    enemies[i].style.left = enemyX[i] + "px";


    // 敵が下まで行ったら上に戻す
    if (enemyY[i] > 500) {

      enemyY[i] = -50;

      enemyX[i] = Math.random() * 360;

      score = score + 1;

      scoreText.textContent = "スコア：" + score;

      // だんだん速くする
      speed = speed + 0.2;
    }


    // あたりを調べる
    let playerRect = player.getBoundingClientRect();
    let enemyRect = enemies[i].getBoundingClientRect();

    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {

      gameOver = true;

      alert("ゲームオーバー！\nスコア：" + score);

      location.reload();
    }
  }

  requestAnimationFrame(game);
}

game();