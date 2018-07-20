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

			if (x > 0 && y > 0 && x < width && y < height) {
				topLeftElev = map(noise((x-1)*noiseScale, (y-1)*noiseScale), 0, 1, 0, 1);
				bottomRightElev = map(noise((x+1)*noiseScale, (y+1)*noiseScale), 0, 1, 0, 1);
				normal = bottomRightElev - topLeftElev;
			} else {
				normal = 0;
			}

			color = [elevation, .5+elevation/2, 1-elevation];
			stroke(...color); point(x, y);
			stroke(0, 0, 0, normal*20); point(x, y);

		}
	}
}