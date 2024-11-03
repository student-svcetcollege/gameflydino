let score = 0;
let cross = true;

const audio = new Audio('wake_up.mp3');
const audiogo = new Audio('club-alarma-145490.mp3');
audio.load();
audiogo.load();
setTimeout(() => {
    audio.play().catch(error => console.error("Audio playback failed:", error));
}, 1000);

const dino = document.querySelector('.dino');
const gameOver = document.querySelector('.gameover');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.getElementById('scorecount');

document.onkeydown = function (e) {
    console.log("Key code is:", e.keyCode);
    if (e.keyCode === 38) { // Up arrow
        dino.classList.add('animateDino');
        setTimeout(() => dino.classList.remove('animateDino'), 700);
    }
    if (e.keyCode === 39) { // Right arrow
        let dinoX = parseInt(window.getComputedStyle(dino).left);
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode === 37) { // Left arrow
        let dinoX = parseInt(window.getComputedStyle(dino).left);
        dino.style.left = (dinoX - 112) + "px";
    }
};

setInterval(() => {
    let dx = parseInt(window.getComputedStyle(dino).left);
    let dy = parseInt(window.getComputedStyle(dino).top);
    let ox = parseInt(window.getComputedStyle(obstacle).left);
    let oy = parseInt(window.getComputedStyle(obstacle).top);

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audio.pause();
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score++;
        updateScore(score);
        cross = false;
        setTimeout(() => { cross = true; }, 1000);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle).animationDuration);
            let newDur = Math.max(aniDur - 0.1, 1); // Minimum duration of 1s
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration:', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    scoreDisplay.innerHTML = "Your Score: " + score;
}
