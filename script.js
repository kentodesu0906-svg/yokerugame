<script>
const player = document.getElementById("player");

let x = 100;
let speed = 5;

const keys = {
  left: false,
  right: false
};

document.addEventListener("keydown", function(e) {

  if (e.key === "ArrowLeft" || e.key === "a") {
    keys.left = true;
  }

  if (e.key === "ArrowRight" || e.key === "d") {
    keys.right = true;
  }

});

document.addEventListener("keyup", function(e) {

  if (e.key === "ArrowLeft" || e.key === "a") {
    keys.left = false;
  }

  if (e.key === "ArrowRight" || e.key === "d") {
    keys.right = false;
  }

});

function gameLoop() {

  if (keys.left) {
    x -= speed;
  }

  if (keys.right) {
    x += speed;
  }

  player.style.left = x + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
</script>