const scale = 100;
const detail = 5;
const precision = 3;
let elevation;
let color;
let normal;
let previousElevation;

function setup() {
	createCanvas(500, 500);
	noLoop();
	colorMode(HSB, 1);
	noiseDetail(detail);
	noStroke();
}

function draw() {
	for (let x = 0; x < width; x+=precision) {
		for (let y = 0; y < height; y+=precision) {
		
			elevation = map(noise(x*(1/scale), y*(1/scale)), 0, 1, 0, 1);

			if (elevation <= .5) {
				elevation /= 2; // océans profonds
			}

			if (x > 0 && y > 0 && x < width && y < height) {
				topLeftElev = map(noise((x-precision)*(1/scale), (y-precision)*(1/scale)), 0, 1, 0, 1);
				if (topLeftElev <= .5) {
					topLeftElev *= .97; // océans profonds
				}
				bottomRightElev = map(noise((x+precision)*(1/scale), (y+precision)*(1/scale)), 0, 1, 0, 1);
				if (bottomRightElev <= .5) {
					bottomRightElev *= .97; // océans profonds
				}
				normal = (bottomRightElev - topLeftElev) / precision;
			} else {
				normal = 0;
			}

			color = [elevation, .5+elevation/2, 1-elevation];
			fill(...color); rect(x, y, precision, precision);
			fill(0, 0, 0, normal*10); rect(x, y, precision, precision); // normal map

		}
	}
}