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
	let higherVal = 0;
	let higherPt = [0, 0];
	for (let x = 0; x < width; x+=precision) {
		for (let y = 0; y < height; y+=precision) {
		
			elevation = getElevation(x, y);

			if (elevation <= .5) {
				elevation /= 2; // océans profonds
			}

			if (x > 0 && y > 0 && x < width && y < height) {
				topLeftElev = getElevation(x - precision, y - precision);
				if (topLeftElev <= .5) {
					topLeftElev *= .97;
				}
				bottomRightElev = getElevation(x + precision, y + precision);
				if (bottomRightElev <= .5) {
					bottomRightElev *= .97;
				}
				normal = (topLeftElev - bottomRightElev) / precision;
			} else {
				normal = 0;
			}
			
			color = mapColorFunctions(elevation);
			fill(...color); rect(x, y, precision, precision);
			fill(0, 0, 0, normal*10); rect(x, y, precision, precision); // normal map

			if (elevation > higherVal) {
				higherVal = elevation;
				higherPt = {x: x, y: y};
			}

		}
	}
}

const getElevation = (x, y) => 1 - noise((x)*(1/scale), (y)*(1/scale));
const limit = (val, min, max) => val >= max ? max : val <= min ? min : val;

mapColorFunctions = (elev) => {
	const h = 1- limit(elev*1.1, 0, .9);
	const s = round(elev)/2+.5;
	const l = .05+elev*.90;

	return [h, s, l];
}