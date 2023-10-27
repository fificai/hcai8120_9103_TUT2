let song;
let fft;
let radius = 150; 
let numBands = 1024; //Number of frequency bands in the spectrum
let angleStep;

function preload() {
  song = loadSound("audio/sample-visualisation (1).mp3");
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT(0.9, numBands);
  song.connect(fft);
  colorMode(HSB, 360, 100, 100); 
  angleStep = TWO_PI / numBands; //the angle step for drawing circles
}

function draw() {
  if (getAudioContext().state !== 'running') {
    background(255);
    text('tap here to play some sound!', 10, 20, width - 20);
    return;
  }

  background(200);
  translate(width / 2, height / 2); 
  noStroke();

  let spectrum = fft.analyze();

  for (let i = 0; i < numBands; i++) {
    let angle = i * angleStep; //the angle for the current band
    let h = map(spectrum[i], 0, 255, 0, radius); // Map spectral values to radius
    let x = cos(angle) * (radius - h); //  x-coordinate
    let y = sin(angle) * (radius - h); //  y-coordinate

    // Smooth interpolation between colors using the lerp() function
    let hue = map(i, 0, numBands, 0, 360);
    fill(hue, 200, 200);
    //small rect
    rect(x, y, 5, 5); 
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
