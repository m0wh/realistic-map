const N = 2000; // number of Voronoi tile
const NOISE_SCALE = 200;
let smallestBorder;

function setup() {
  createCanvas(800, 600);
	smallestBorder = width > height ? height : width;
	noLoop();
}

function draw() {

  for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			stroke(elev(x, y));
			point(x,y);
		}
	}
}

const elev = (x, y) => {
	const T = noise(x/NOISE_SCALE, y/NOISE_SCALE)
	const smoothT = 1 - (dist(width/2, height/2, x, y) + noise(x/NOISE_SCALE, y/NOISE_SCALE)*20) / smallestBorder * 2;

	return (smoothT - T) * 255;
}