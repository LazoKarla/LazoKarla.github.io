let particles = [];
let backgroundSparks = []; // Arreglo para los destellos del fondo

function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("#my-p5-sketch");
  background(0);
}

function draw() {
  background(0, 50); // Fondo negro con ligera transparencia para efecto de estela

  // Dibujar los destellos del fondo
  for (let i = backgroundSparks.length - 1; i >= 0; i--) {
    backgroundSparks[i].update();
    backgroundSparks[i].show();
    if (backgroundSparks[i].isFaded()) {
      backgroundSparks.splice(i, 1); // Eliminar destellos que desaparecen
    }
  }

  // Crear destellos aleatorios en el fondo
  if (random(1) < 0.1) {
    // Probabilidad de que aparezca un nuevo destello
    let x = random(width);
    let y = random(height);
    let size = random(10, 50); // Tamaño variable del destello
    backgroundSparks.push(new Spark(x, y, size));
  }

  // Actualizar y mostrar las partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1); // Eliminar partículas que salen del lienzo
    }
  }
}

function mouseMoved() {
  // Crear partículas en forma de hélice al mover el mouse
  for (let i = 0; i < 10; i++) {
    let angle = map(i, 0, 10, 0, TWO_PI); // Espaciado entre partículas
    let xOffset = 50 * sin(angle + frameCount * 0.1); // Oscilación horizontal
    let yOffset = 50 * cos(angle + frameCount * 0.1); // Oscilación vertical
    particles.push(new Particle(mouseX + xOffset, mouseY + yOffset));
  }
}

// Clase para las partículas
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255; // Transparencia inicial
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5; // Reducir transparencia gradualmente
  }

  show() {
    noStroke();
    fill(0, 200, 180, this.alpha); // Color de las partículas
    ellipse(this.x, this.y, 10);
  }

  isOffScreen() {
    return this.alpha <= 0;
  }
}

// Clase para los destellos del fondo
class Spark {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alpha = 200; // Transparencia inicial
  }

  update() {
    this.alpha -= 3; // Reducir transparencia gradualmente
  }

  show() {
    noStroke();
    fill(0, 200, 180, this.alpha); // Color amarillo brillante
    ellipse(this.x, this.y, this.size);
  }

  isFaded() {
    return this.alpha <= 0; // Desaparece cuando la transparencia llega a 0
  }
}
