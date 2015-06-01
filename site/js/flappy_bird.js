var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.gapSize = Number($("input[name=gapSize]:checked").val());
    setInterval(this.addPipes.bind(this), 2000);    
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
}

exports.FlappyBird = FlappyBird;