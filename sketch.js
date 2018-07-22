const N = 2000;
const NOISE_SCALE = 200;
let inc;
let p;
let points;
let coordinates = [];
let voronoi;
let diagram;

let altitudeSeed;

function setup() {
  createCanvas(800, 600);
  noLoop();
  colorMode(HSL, 1);

  inc = sqrt((width*height)/N);
  
  altitudeSeed = floor(random(1000));
  console.log(altitudeSeed);
  noiseSeed(altitudeSeed);

  voronoi = new Voronoi();  
  points = generatePoints(width, height);
  diagram = voronoi.compute(points, { xl: 0, xr: width, yt: 0, yb: height });
}

function draw() {
  diagram.cells.forEach(drawCell);
}


const drawCell = cell => {
  push();
  const elevation = ridgenoise(cell.site.x/NOISE_SCALE ,cell.site.y/NOISE_SCALE);
  fill(mapColorFunctions(elevation));
  stroke(mapColorFunctions(elevation));
  beginShape();
  cell.halfedges.forEach(h => {
    vertex(h.getStartpoint().x, h.getStartpoint().y)
  });
  endShape();
  pop();
}

const generatePoints = (w, h) => {
  // return new Array(n).fill(null).map(() => createVector(random(w), random(h)));
  
  
  let pts = [];
  for (let x = 0; x < width; x += inc) {
    for (let y = 0; y < height; y += inc) {
      pts.push(createVector(x +random(inc*.8), y +random(inc*.8)));
    }
  }
  return pts;
}

const ridgenoise = (nx, ny) => 2 * (0.45 - abs(0.5 - noise(nx, ny)));

mapColorFunctions = (elev) => {
	const h = elev >= .6 ? .15+elev/5 : .56;
	const s = 1;
	const l = .4 + elev*.6;
	return [h, s, l];
}

// const { triangles } = Delaunator.from(points, pt => pt.x, pt => pt.y);

// for (let i = 0; i < triangles.length; i += 3) {
//   coordinates.push([
//     points[triangles[i]],
//     points[triangles[i + 1]],
//     points[triangles[i + 2]]
//   ]);
// }