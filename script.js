var body = document.getElementsByTagName("body")[0];
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
body.appendChild(canvas);

canvas.style.padding = "0px";
canvas.style.margin = "0px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

body.style.padding = "0px";
body.style.margin = "0px";
body.style.overflow = "hidden";

var camera = new Point(0, 0, 0);
camera.dx = 0;
camera.dy = 0;
camera.dz = 0;
camera.friction = 0.9;
camera.speed = 5;

var map = new Map();

var x = 0;
var y = 0;

setInterval(function(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.translate(window.innerWidth/2, window.innerHeight/2);

    map.sortShapes();

    map.allShapes.forEach(function(e){
        e.display(camera);
    });

    camera.translate(Math.round(camera.dx), Math.round(camera.dy), Math.round(camera.dz));
    camera.dx *= camera.friction;
    camera.dy *= camera.friction;
    camera.dz *= camera.friction;

    ctx.translate(-window.innerWidth/2, -window.innerHeight/2);
}, 1000/15);

window.addEventListener("keydown", function(e){
    // Up
    if(e.keyCode == 38){
        camera.dy -= camera.speed;
        //car.translate(0, 10, 0);
    }
    // Down
    if(e.keyCode == 40){
        camera.dy += camera.speed;
    }
    // Left
    if(e.keyCode == 37){
        camera.dx -= camera.speed;
    }
    // Right
    if(e.keyCode == 39){
        camera.dx += camera.speed;
    }
    if(e.keyCode == 188){
        camera.dz -= camera.speed;
    }
    if(e.keyCode == 190){
        camera.dz += camera.speed;
    }

    // W
    if(e.keyCode == 87){
        map.allShapes.forEach(function(shape){
            shape.rotateX(Math.PI/24);
        });


    }
    //S
    if(e.keyCode == 83){
        map.allShapes.forEach(function(shape){
            shape.rotateX(-Math.PI/24);
        });
    }
    //A
    if(e.keyCode == 65){
        map.allShapes.forEach(function(shape){
            shape.rotateY(-Math.PI/24);
        });
    //D
  }
    if(e.keyCode == 68){
        map.allShapes.forEach(function(shape){
            shape.rotateY(Math.PI/24);
        });
    }
});
