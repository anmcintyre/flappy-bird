var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var wall = require('./entities/wall');

var FlappyBird = function() {
    this.entities = [];
    this.entities.push(new bird.Bird(this));
    this.entities.push(new wall.Wall({x:-2, y:0, width:0.05, height:1}, this)); //left side (for pipes)
    this.entities.push(new wall.Wall({x:-2, y:-0.94, width:4, height:0.05}, this)); //bottom (for birds)
    this.entities.push(new wall.Wall({x:-2, y:1.01, width:4, height:0.05}, this)); //top  (for birds)

    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function(event) {
        this.graphics.run();
        this.physics.run();
        this.input.run();
        this.gapSize = Number($("input[name=gapSize]:checked").val());
        this.intervalID = setInterval(this.addPipes.bind(this), 2000);  
        $("#aboutToStartDiv").hide();  
    };

FlappyBird.prototype.stop = function(){
    this.input.stop(this);
    this.graphics.stop();
    this.physics.stop();
    clearInterval(this.intervalID);
    $("#aboutToStartDiv").show();
};

FlappyBird.prototype.addPipes = function(){
    var maxY = 0.40;
    var minY = 0.10;
    var gapPosition = Math.random() * (maxY-minY) + minY;
    var bottomSize = {
        x: 0,
        y: 0,
        width: 0.15,
        height: gapPosition
    }
    var topSize = {
        x: 0,
        y: gapPosition+this.gapSize,
        width: 0.15,        
        height: 1-(this.gapSize+gapPosition)     
    }
    this.entities.push(new pipe.Pipe(bottomSize), new pipe.Pipe(topSize));
};

FlappyBird.prototype.restart = function(birdEntity){
    console.log("restart");
    //Reset bird's position
    birdEntity.components.physics.position.y = 0.5;
    birdEntity.components.physics.velocity.y = 0;

    //remove current pipes
    var i=this.entities.length; 
    while ( i--){
        if (this.entities[i].clearOnRestart())
            this.entities.splice(i, 1);
    }    

    this.stop();
};
exports.FlappyBird = FlappyBird;