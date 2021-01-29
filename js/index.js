
// animate()

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// roadImg.onload = animate
let roadImg = new Image();
roadImg.src = "./images/road.png";
let road = { x: 0, y: 0, w: canvas.width, h: canvas.height, img: roadImg };

// carImg.onload = animate
let carImg = new Image();
carImg.src = "./images/car.png";
let elon = new Image()
elon.src = "https://banner2.cleanpng.com/20180522/yrt/kisspng-elon-musk-tesla-motors-investor-the-boring-company-5b03a350e8aea7.3097603915269650729531.jpg"

class Bullet {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }
  draw() {
    this.y--
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    let i = 0
    for (box of boxes) {
      this.bulletCollDetection(box, this, i)
      i++
    }

  }
  bulletCollDetection(rect1, rect2, i) {
    if (rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
      console.log('collision')
      boxes.splice(i, 1)
      this.w = 50
      this.h = 50
    }
  }
}

class Car {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

}

let toyota = new Car(
  canvas.width / 2 - 50,
  canvas.height - 100,
  50,
  100,
  carImg
);

function collisionDetection(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y) {
    // collision detected!
    //alert("Collision detected")
    document.getElementById("gameOver").innerHTML = "GAME OVER"
    cancelAnimationFrame(gameLoop)
  }
}


window.onkeydown = function (e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      // if (toyota.x >= 0)
      toyota.x -= 30;
      break;
    case "ArrowRight":
      // if ((toyota.x < canvas.width-toyota.w))
      toyota.x += 30;
      break;
    case "ArrowUp":
      toyota.y -= 30;
      break;
    case "ArrowDown":
      toyota.y += 30;
      break;
    case " ":
      bullets.push(new Bullet(toyota.x, toyota.y, 10, 10, elon))
  }
};
const bullets = []


const startSpeed = 1;
let speedMultiplier = 1;

class Obstacle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw() {
    this.y += startSpeed * speedMultiplier;

    let { r, g, b } = this.color;

    const pctDown = this.y / canvas.height;

    // console.log(pctDown, this.y, canvas.height);
    r = r + (255 - r) * pctDown;
    g = g - g * pctDown;
    b = b - b * pctDown;

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    ctx.fillRect(this.x, this.y, this.w, this.h);

    collisionDetection(this, toyota)
  }
}

// let boxObstacle = new Obstacle(50, 50, 50, 50, "red");

let boxes = [];
let gameLoop;
function animate() {
  gameLoop = requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(roadImg, road.x, road.y, road.w, road.h);
  toyota.draw();
  // boxObstacle.draw();
  // boxObstacle2.draw();
  // box.draw()
  for (box of boxes) {
    box.draw();

  }
  for (bullet of bullets) {
    bullet.draw();
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return { r, g, b };
}

// let boxObstacle2 = new Obstacle(100, 100, 50, 50, "gold");
setInterval(() => {
  let box = new Obstacle(
    canvas.width * Math.random(),
    0,
    50,
    50,
    randomColor()
  );
  speedMultiplier = Math.min(speedMultiplier + 0.15, 3);

  boxes.push(box);
}, 1000);

animate();