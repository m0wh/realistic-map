let voronoi;

function setup() {
  createCanvas(500,500);
  noFill();

  voronoi = new Voronoi();
  
  var diagram = voronoi.compute(points, {
    xl: 0, xr: width, yt: 0, yb: height
  });
  
  sites.forEach(s => ellipse(s.x, s.y, 5, 5));

  diagram.cells.forEach((cell, i) => {    
    beginShape();
      cell.halfedges.forEach(({edge: {va, vb}}) => {
        console.log(va.x, va.y);
        
        vertex(va.x, va.y);
      });
    endShape(cell.closeMe ? CLOSE : null);
  });
  
}