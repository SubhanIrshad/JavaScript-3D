
var Map = function(){

  this.allShapes = [];

    this.grid = {
        rows: [
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0]
        ]
    };

    this.blocks = new Array(this.grid.rows.length);

    for(var i = 0; i < this.grid.rows.length; i++){
        this.blocks[i] = new Array(this.grid.rows[i].length);
    }

    this.generateMap();
    console.log(JSON.stringify(this.blocks));
};

this.createCube = function(x, y, z, length, width, height){
    var cube = new Shape(ctx);

    cube.centerX = x;
    cube.centerY = y;
    cube.centerZ = z;

    var face1 = new Face();
    var face2 = new Face();
    var face3 = new Face();
    var face4 = new Face();

    cube.addFace(face1);
    cube.addFace(face2);
    cube.addFace(face3);
    cube.addFace(face4);

    face1.addPoint(new Point(x - length, y + height, z - width));
    face1.addPoint(new Point(x - length, y + height, z + width));
    face1.addPoint(new Point(x + length, y + height, z + width));
    face1.addPoint(new Point(x + length, y + height, z - width));
    face1.addPoint(new Point(x - length, y + height, z - width));

    face2.addPoint(new Point(x - length, y - height, z + width));
    face2.addPoint(new Point(x - length, y + height, z + width));
    face2.addPoint(new Point(x + length, y + height, z + width));
    face2.addPoint(new Point(x + length, y - height, z + width));
    face2.addPoint(new Point(x - length, y - height, z + width));

    face3.addPoint(new Point(x - length, y - height, z - width));
    face3.addPoint(new Point(x - length, y - height, z + width));
    face3.addPoint(new Point(x + length, y - height, z + width));
    face3.addPoint(new Point(x + length, y - height, z - width));
    face3.addPoint(new Point(x - length, y - height, z - width));

    face4.addPoint(new Point(x - length, y - height, z - width));
    face4.addPoint(new Point(x - length, y + height, z - width));
    face4.addPoint(new Point(x + length, y + height, z - width));
    face4.addPoint(new Point(x + length, y - height, z - width));
    face4.addPoint(new Point(x - length, y - height, z - width));

    console.log(cube.faces);

    console.log(cube.faces);
    console.log("cube created");

    return cube;
};

Map.prototype.sortShapes = function(){

      this.allShapes.sort(function(a, b){
          if(a.centerZ > b.centerZ){
              return -1;
          } else if (b.centerZ > a.centerZ){
              return 1;
          } else {
              return 0;
          }
      });

      this.allShapes.forEach(function(shape){
          shape.faces.forEach(function(face){
              face.updateCenter();
          });
      });

      this.allShapes.forEach(function(shape){
          shape.faces.sort(function(a, b){
              if(a.centerZ > b.centerZ){
                  return 1;
              } else if (b.centerZ > a.centerZ){
                  return -1;
              } else {
                  return 0;
              }
          })
      })
}

Map.prototype.generateMap = function(){

    for(var i = 0; i < this.grid.rows.length; i++){
        for(var j = 0; j < this.grid.rows[i].length; j++){
            if(this.grid.rows[i][j] == 1){
              var cube = new createCube(j * 100,100 * i, 100, 40, 40, 40);
              this.allShapes.push(cube);
              this.blocks[i][j] = cube;
            }
        }
    }
};
