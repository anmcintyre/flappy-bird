var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var uiSystem = require('./systems/ui');
var scoreBoardSystem = require('./systems/scoreboard');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var wall = require('./entities/wall');
var pipeCheck = require('./entities/pipeCheck');
var starField = require('./entities/starField');


var FlappyBird = function() {
    this.entities = [];
    this.entities.push(new bird.Bird(this));
    this.entities.push(new starField.StarField(this));
    this.entities.push(new wall.Wall({x:-2, y:0, width:0.05, height:1}, this)); //left side (for pipes)
    this.entities.push(new wall.Wall({x:-2, y:-0.94, width:4, height:0.05}, this)); //bottom (for birds)
    this.entities.push(new wall.Wall({x:-2, y:1.01, width:4, height:0.05}, this)); //top  (for birds)

    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.ui = new uiSystem.UISystem();
    this.scoreboard = new scoreBoardSystem.ScoreBoardSystem();

    this.timeToNextPipe = 2000;

};

FlappyBird.prototype.run = function(event) {
    this.physics.run();
    this.input.run();
    this.scoreboard.successfulPipeCount = 0;
    this.gapSize = Number($("input[name=gapSize]:checked").val());
    this.timeoutID = setTimeout(this.addPipes.bind(this), this.timeToNextPipe);  
    this.ui.start();
};

FlappyBird.prototype.stop = function(){
    this.timeToNextPipe = 2000;
    this.input.stop(this);
    this.physics.stop();
    clearTimeout(this.timeoutID);
    this.ui.stop();
    this.scoreboard.save(this.ui);
};

FlappyBird.prototype.addPipes = function(){
    var maxY = 0.40;
    var minY = 0.20;
    var gapPosition = Math.random() * (maxY-minY) + minY;
    var bottomSize = {
        x: 0,
        y: 0,
        width: 0.15,
        height: gapPosition,
        position: "bottom"
    };
    var topSize = {
        x: 0,
        y: gapPosition+this.gapSize,
        width: 0.15,        
        height: 1-(this.gapSize+gapPosition),
        position: "top"
    };
    this.entities.push(new pipe.Pipe(bottomSize), new pipe.Pipe(topSize));
    this.entities.push(new pipeCheck.PipeCheck({x: 1.16, y: 0, width: 0.01, height: 1}, this));
    this.timeToNextPipe -= 20;
    this.timeoutID = setTimeout(this.addPipes.bind(this), this.timeToNextPipe);  
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