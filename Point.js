var Point = function(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.screenX = 0;
    this.screenY = 0;
};

Point.prototype.translate = function(dx, dy, dz){
    this.x += dx;
    this.y += dy;
    this.z += dz;
};

