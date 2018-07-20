const noiseScale = 0.01;
let elevation;
let color;
let normal;
let previousElevation;

function setup() {
	createCanvas(500, 500);
	noLoop();
	background(255);
	colorMode(HSB, 1);
	noiseDetail(5);
}

function draw() {
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
		
			elevation = map(noise(x*noiseScale, y*noiseScale), 0, 1, 0, 1);

			if (elevation <= .5) {
				elevation = elevation*.5; // océans profonds
			}


			color = [elevation, .5+elevation/2, 1-elevation];
			stroke(...color); point(x, y);

		}
	}
}