var Shape = function(ctx){
    this.faces = [];

    this.ctx = ctx;
};

Shape.prototype.addFace = function(face){
    this.faces.push(face);
};

Shape.prototype.translate = function(dx, dy, dz){
    this.faces.forEach(function(face){
        face.points.forEach(function(point){
            point.x += dx;
            point.y += dy;
            point.z += dz;
        });
    });
};

Shape.prototype.sortFaces = function(){
  this.faces.sort(function(a, b){

      if(a.centerZ > b.centerZ){
          return -1;
      } else if (b.centerZ > a.centerZ){
          return 1;
      } else {
          return 0;
      }

  });
}
Shape.prototype.updateCenter = function(){
    var totalX = 0;
    var totalY = 0;
    var totalZ = 0;

    var numPoints = 0;

    this.faces.forEach(function(face){
        face.points.forEach(function(point){
            totalX += point.x;
            totalY += point.y;
            totalZ += point.z;
            numPoints++;
        })
    });

    this.centerX = (totalX / numPoints);
    this.centerY = (totalY / numPoints);
    this.centerZ = (totalZ / numPoints);

    console.log("shape cener: (" + this.centerX + ", " + this.centerY + ", " + this.centerZ + ")");

};

Shape.prototype.rotateX = function(dx){
    this.updateCenter;

    var centerY = this.centerY;
    var centerZ = this.centerZ;

    this.faces.forEach(function(face){
        face.points.forEach(function(point){
            var ny, nz;

            ny = ((point.y - centerY) * Math.cos(dx) - (point.z - centerZ) * Math.sin(dx)) + centerY;
            nz = ((point.y - centerY) * Math.sin(dx) + (point.z - centerZ) * Math.cos(dx)) + centerZ;

            point.y = ny;
            point.z = nz;
        });
    });
}

Shape.prototype.rotateY = function(dy){
    this.updateCenter;

    var centerX = this.centerX;
    var centerZ = this.centerZ;

    this.faces.forEach(function(face){
        face.points.forEach(function(point){
            var nx, nz;

            nx = ((point.x - centerX) * Math.cos(dy) - (point.z - centerZ) * Math.sin(dy)) + centerX;
            nz = ((point.x - centerX) * Math.sin(dy) + (point.z - centerZ) * Math.cos(dy)) + centerZ;

            point.x = nx;
            point.z = nz;
        });
    });
}

Shape.prototype.rotateZ = function(dz){
    this.updateCenter;

    var centerX = this.centerX;
    var centerY = this.centerY;

    this.faces.forEach(function(face){
        face.points.forEach(function(point){
            var nx, ny;

            nx = ((point.x - centerX) * Math.cos(dz) - (point.x - centerX) * Math.sin(dz)) + centerX;
            ny = ((point.x - centerY) * Math.sin(dz) + (point.y - centerY) * Math.cos(dz)) + centerY;

            point.x = nx;
            point.y = ny;
        });
    });
}

Shape.prototype.display = function(camera){

    // THIS SHOULD BE CONTAINED IN CAMERA OBJECT. (WILL FIX LATER)
    var screenDistance = 500;

    // Update screen coordinates for shape
    this.faces.forEach(function(face){
        face.points.forEach(function(point){
            point.screenY = (point.y - camera.y) * (screenDistance/(point.z - camera.z + screenDistance));
            point.screenX = (point.x - camera.x)* (screenDistance/(point.z - camera.z + screenDistance));
            //console.log("screenX: " + point.screenX + " screenY: " + point.screenY);
        });
    });



    //this.ctx.fillRect(0, 0, 15, 15);
    this.ctx.lineWidth = 1;
    this.ctx.strokeColor = "blue";

    this.ctx.fillStyle = "green";

    this.faces.forEach(function(face){

        this.ctx.beginPath();
            face.points.forEach(function (point) {

                if (camera.z - point.z < screenDistance) {
                    this.ctx.lineTo(point.screenX, point.screenY);
                }
            });

            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
    });
}
