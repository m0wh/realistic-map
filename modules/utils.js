
const ridgenoise = (nx, ny, nz) => 2 * (0.5 - abs(0.5 - noise(nx, ny, nz)));

const limit = (val, min, max) => val < min ? min : val > max ? max : val;

const cellCentroid = (cell) => {
	const x = cell.halfedges.reduce((acc, val) => acc + val.getStartpoint().x, 0) / cell.halfedges.length;
	const y = cell.halfedges.reduce((acc, val) => acc + val.getStartpoint().y, 0) / cell.halfedges.length;

	return createVector(x, y);
}

const paint = (a, b = undefined, c = undefined, d = undefined) => {
  if (!b) {
    fill(a);
    stroke(a);
  } else if (!c) {
    fill(a, b);
    stroke(a, b);
  } else if (!d) {
    fill(a, b, c);
    stroke(a, b, c);
  } else {
    fill(a, b, c, d);
    stroke(a, b, c, d);
  }
}



// const { triangles } = Delaunator.from(points, pt => pt.x, pt => pt.y);

// for (let i = 0; i < triangles.length; i += 3) {
//   coordinates.push([
//     points[triangles[i]],
//     points[triangles[i + 1]],
//     points[triangles[i + 2]]
//   ]);
// }