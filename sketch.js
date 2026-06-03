let buttons = [];
let sounds = [];
const emojis = ['☮️', '😜', '😠', '🚂', '😴', '💙💛'];
const baseColors = [
  [255, 100, 100],
  [100, 255, 100],
  [100, 100, 255],
  [255, 255, 100],
  [255, 100, 255],
  [100, 255, 255]
];
const NUM_BUTTONS = 6;
const BUTTON_SIZE = 70;
const SPACING = 30;

function createAudio(path, altPath) {
  let audio = new Audio(path);
  audio.addEventListener('error', () => {
    if (altPath && !audio.src.includes(altPath)) {
      audio.src = altPath;
      audio.load();
    }
  });
  return audio;
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvas-container');

  sounds[0] = createAudio('01donCherryBrownRice.mp3', 'audio/01donCherryBrownRice.mp3');
  sounds[1] = createAudio('02jeanJacquesPerreyTheElephantNeverForgets.mp3', 'audio/02jeanJacquesPerreyTheElephantNeverForgets.mp3');
  sounds[2] = createAudio('03cromax.wav', 'audio/03cromax.wav');
  sounds[3] = createAudio('04tren.wav', 'audio/04tren.wav');
  sounds[4] = createAudio('05sueno.wav', 'audio/05sueno.wav');
  sounds[5] = createAudio('06boca.wav', 'audio/06boca.wav');

  for (let i = 0; i < NUM_BUTTONS; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    buttons.push({
      x: width / 2 - (3 * (BUTTON_SIZE + SPACING)) / 2 + col * (BUTTON_SIZE + SPACING) + BUTTON_SIZE / 2,
      y: height / 2 - (BUTTON_SIZE + SPACING) / 2 + row * (BUTTON_SIZE + SPACING),
      size: BUTTON_SIZE,
      index: i,
      isHovered: false,
      isPlaying: false
    });
  }
}

function draw() {
  background(255);

  fill(0);
  textFont('Helvetica');
  textSize(48);
  textAlign(CENTER, CENTER);
  text('TOI', width / 2, 50);

  for (let btn of buttons) {
    btn.isHovered = dist(mouseX, mouseY, btn.x, btn.y) < btn.size / 2;

    let col = baseColors[btn.index];
    if (btn.isPlaying) {
      fill(min(255, col[0] + 100), min(255, col[1] + 100), min(255, col[2] + 100));
    } else if (btn.isHovered) {
      fill(min(255, col[0] + 50), min(255, col[1] + 50), min(255, col[2] + 50));
      cursor(HAND);
    } else {
      fill(col[0], col[1], col[2]);
      cursor(ARROW);
    }

    stroke(40, 100, 180);
    strokeWeight(3);
    circle(btn.x, btn.y, btn.size);

    fill(255);
    textFont('Helvetica');
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text(emojis[btn.index], btn.x, btn.y);
  }
}

function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    if (dist(mouseX, mouseY, btn.x, btn.y) < btn.size / 2) {
      if (sounds[i]) {
        if (btn.isPlaying) {
          sounds[i].pause();
          btn.isPlaying = false;
        } else {
          sounds[i].currentTime = 0;
          sounds[i].play();
          btn.isPlaying = true;
          sounds[i].addEventListener('ended', () => {
            btn.isPlaying = false;
          }, { once: true });
        }
      }
    }
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < buttons.length; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    buttons[i].x = width / 2 - (3 * (BUTTON_SIZE + SPACING)) / 2 + col * (BUTTON_SIZE + SPACING) + BUTTON_SIZE / 2;
    buttons[i].y = height / 2 - (BUTTON_SIZE + SPACING) / 2 + row * (BUTTON_SIZE + SPACING);
  }
}

