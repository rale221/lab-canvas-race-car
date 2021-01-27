window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() { }
};
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

// roadImg.onload = animate
let roadImg = new Image()
roadImg.src = "./images/road.png"
let road = { x: 0, y: 30, w: 450, h: 600, img: roadImg }

// carImg.onload = animate
let carImg = new Image()
carImg.src = "./images/car.png"

class Car {
  constructor(x, y, w, h, img) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.img = img
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}

let toyota = new Car(0, 0, 100, 200, carImg)

window.onkeydown = function (e) {
  console.log(e.key)
  switch (e.key) {
    case "ArrowLeft":
      // if (toyota.x >= 0)
      toyota.x -= 30;
      break;
    case "ArrowRight":
      // if ((toyota.x < canvas.width-toyota.w))
      toyota.x += 30;
      break
    case "ArrowUp":
      toyota.y -= 30;
      break;
    case "ArrowDown":
      toyota.y += 30;
      break
  }
}






function animate() {
  let gameLoop = requestAnimationFrame(animate)
  console.log("animate")
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(roadImg, road.x, road.y, road.w, road.h)
  toyota.draw()

}
animate()