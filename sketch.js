const N = 2000; // number of Voronoi tile
const NOISE_SCALE = 200;

let points;
let voronoi;
let diagram;

function setup() {
  createCanvas(800, 600);
  noLoop();

  voronoi = new Voronoi();  
  points = generatePoints(N, width, height, 5);
  diagram = voronoi.compute(points, { xl: -2, xr: width+2, yt: -2, yb: height+2 });
}

function draw() {
  diagram.cells.forEach(cell => {
    cell.elevation = ridgenoise(cell.site.x/NOISE_SCALE, cell.site.y/NOISE_SCALE);
    drawCell(cell);
  });
}

/**
 * Draws a cell
 * @param cell Voronoi.Cell object (from Javascript-Voronoi)
 */
const drawCell = cell => {
  // ellipse(cellCentroid(cell).x, cellCentroid(cell).y, 2, 2);
  paint(cell.elevation * 255);
  beginShape();
  cell.halfedges.forEach((h, i) => {
    vertex(h.getStartpoint().x, h.getStartpoint().y);
  });
  endShape(cell.closeMe ? CLOSE : null);
}

/**
 * Random points generations (with relaxing for more regularity)
 * @param {number} n Number of points to generate
 * @param {number} w Width
 * @param {number} h Height
 * @param {number} iterations Number of Voronoi relaxing iterations
 */
const generatePoints = (n, w, h, iterations = 2) => {
  let pts = new Array(n).fill().map(p => createVector(random(w), random(h)));
  const voro = new Voronoi();

  for (let i = 0; i < iterations; i++) {
    const cells = voro.compute(pts, { xl: -2, xr: w+2, yt: -2, yb: h+2 }).cells;
    pts = cells.map( c => cellCentroid(c));
  }
  return pts;
}

const addIsland = () => {
  console.log(diagram);
}