var Face = function(){

    this.points = [];
    this.centerX;
    this.centerY;
    this.centerZ;

};

Face.prototype.updateCenter = function() {
    var totalX, totalY, totalZ, numPoints;

    this.points.forEach(function(point){
        totalX += point.x;
        totalY += point.y;
        totalZ += point.z;
        numPoints++;
    });

    this.centerX = totalX / numPoints;
    this.centerY = totalY / numPoints;
    this.centerZ = totalZ / numPoints;

}

Face.prototype.translate = function(dx, dy, dz){
    this.points.forEach(function(point){
        point.x += dx;
        point.y += dy;
        point.z += dz;
    });
};

Face.prototype.addPoint = function(point){
    this.points.push(point);
};
