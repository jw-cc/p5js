// https://p5js.org/examples/3d-simple-feedback.html

let pg, swap;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // this will hold the previous frame
  pg = createGraphics(windowWidth, windowHeight, WEBGL);
  // this will hold our main graphic
  swap = createGraphics(windowWidth, windowHeight, WEBGL);

  describe(
    "a slowly oscillating, radiating white sphere that fades into a dark gray background through a feedback visual effect"
  );
}

function draw() {
  // clears and resets the p5.Graphics so that 3D objects draw correctly
  pg.reset();

  // draw the previous frame
  pg.texture(swap);
  pg.noStroke();
  pg.plane(width, height);

  // draw our sphere on top
  pg.push();

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pg.pointLight(250, 250, 250, locX, locY, 300);

  // slowly move the sphere in a circle
  pg.translate(sin(millis() / 200) * 5, cos(millis() / 200) * 5, 0);
  pg.fill(255);
  pg.sphere(30, 20, 20);
  pg.pop();

  // draw a slightly scaled up copy of the texture
  swap.push();
  swap.scale(1.1, 1.1);
  swap.texture(pg);
  swap.noStroke();
  swap.plane(width, height);
  swap.pop();

  // an opaque rectangle is drawn over top to control the feedback decay
  swap.fill(0, 40);
  swap.rect(-width / 2, -height / 2, width, height);

  // draw the output to the screen
  image(swap, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight, WEBGL);
  swap = createGraphics(windowWidth, windowHeight, WEBGL);
}
