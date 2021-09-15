const n_id = Math.round(Math.random() * 8887) + 1
let n_data
let n_token
let N // number of Voronoi tile
let elevation_noise_scale

let points
let voronoi
let diagram

function preload () {
  n_data = loadJSON('https://raw.githubusercontent.com/TSnark/n-project/main/data/n.json')
}

function setup() {
  createCanvas(800, 600)
  noLoop()

  n_token = n_data[n_id - 1][n_id.toString()]
  console.table(n_token)
  N = n_token.sum * n_token.sum
  elevation_noise_scale = n_token.first * 100
  moisture_noise_scale = n_token.second * 100

  colorMode('HSL', 100)

  voronoi = new Voronoi()  
  points = generatePoints(N, width, height, 5)
  diagram = voronoi.compute(points, { xl: -2, xr: width+2, yt: -2, yb: height+2 })
}

function draw() {
  diagram.cells.forEach(cell => {
    cell.elevation = ridgenoise(cell.site.x / elevation_noise_scale, cell.site.y / elevation_noise_scale)
    cell.moisture = ridgenoise(n_token.sum + cell.site.x / moisture_noise_scale, n_token.sum + cell.site.y / moisture_noise_scale)
    cell.normal = (cell.elevation - ridgenoise((cell.site.x - 10) / elevation_noise_scale, (cell.site.y - 10) / elevation_noise_scale)) * 100
    drawCell(cell)
  })
}

/**
 * Draws a cell
 * @param cell Voronoi.Cell object (from Javascript-Voronoi)
 */
const drawCell = cell => {
  // ellipse(cellCentroid(cell).x, cellCentroid(cell).y, 2, 2)
  const cl = getClimate(cell.elevation, cell.moisture, cell.normal)

  paint(cl.color)
  beginShape()
  cell.halfedges.forEach((h, i) => {
    vertex(h.getStartpoint().x, h.getStartpoint().y)
  })
  endShape(cell.closeMe ? CLOSE : null)
}

/**
 * Random points generations (with relaxing for more regularity)
 * @param {number} n Number of points to generate
 * @param {number} w Width
 * @param {number} h Height
 * @param {number} iterations Number of Voronoi relaxing iterations
 */
const generatePoints = (n, w, h, iterations = 2) => {
  let pts = new Array(n).fill().map(p => createVector(random(w), random(h)))
  const voro = new Voronoi()

  for (let i = 0; i < iterations; i++) {
    const cells = voro.compute(pts, { xl: -2, xr: w+2, yt: -2, yb: h+2 }).cells
    pts = cells.map( c => cellCentroid(c))
  }
  return pts
}

const addIsland = () => {
  console.log(diagram)
}