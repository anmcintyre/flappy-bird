(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x + sizeB.x,
                 positionB.x + sizeB.x + sizeB.width),
        y: clamp(positionA.y, positionB.y + sizeB.y,
                 positionB.y + sizeB.y + sizeB.height)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x + sizeA.x ;
    var rightA = positionA.x + sizeA.x + sizeA.width;
    var bottomA = positionA.y + sizeA.y;
    var topA = positionA.y + sizeA.y + sizeA.height;

    var leftB = positionB.x + sizeB.x ;
    var rightB = positionB.x + sizeB.x  + sizeB.width;
    var bottomB = positionB.y + sizeB.y;
    var topB = positionB.y + sizeB.y + sizeB.height;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity){
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context){
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);

    //"ship"
    context.beginPath();
    context.fillStyle="black";
    context.strokeStyle="gray"; 
    context.lineWidth=0.001;
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);   
    context.closePath();
    context.fill();
    context.stroke();     

    //red bird body
    context.beginPath();
    context.fillStyle="#318690";
    context.strokeStyle="#318690";
    context.lineWidth=0.008;
    context.arc(0, 0, 0.008, 0, 2 * Math.PI);    
    context.closePath();
    context.fill();
    context.stroke();    

    //bird beak
    context.beginPath();
    context.fillStyle="yellow";
    context.strokeStyle="#FF8F35";
    context.lineWidth=0.001;
    context.moveTo(.008,0.006);
    context.lineTo(.017,0.0);
    context.lineTo(.008,-0.006);
    context.closePath();
    context.fill();
    context.stroke();   

    context.beginPath();
    context.strokeStyle="#black";
    context.lineWidth=0.001;
    context.moveTo(.017,0.0);
    context.lineTo(.008,0.0);
    context.closePath();
    context.stroke();   


    //eye
   	context.beginPath();
    context.fillStyle="white";
    context.strokeStyle="white"; 
    context.lineWidth=0.001;
    context.arc(.002, 0.006, 0.003, 0, 2 * Math.PI);   
    context.closePath();
    context.fill();
    context.stroke();    
    context.closePath();
    context.fill();
    context.stroke(); 

   	context.beginPath();
    context.fillStyle="black";
    context.strokeStyle="black"; 
    context.lineWidth=0.001;
    context.arc(.002, 0.006, 0.001, 0, 2 * Math.PI);   
    context.closePath();
    context.fill();
    context.stroke();    
    context.closePath();
    context.fill();
    context.stroke();     

    //wing
    context.beginPath();
    context.fillStyle="#318690";
    context.strokeStyle="black";
    context.lineWidth=0.001;
    context.moveTo(-0.006,0.01);
    context.lineTo(0,0);
    context.lineTo(-0.006, -0.01);
    context.lineTo(-0.019,0);
    context.closePath();
    context.fill();
    context.stroke();     

    context.restore();
}

exports.BirdGraphicsComponent = BirdGraphicsComponent; 
},{}],4:[function(require,module,exports){
var PipeGraphicsComponent = function(entity){
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
    var position = this.entity.components.physics.position;
    var size = this.entity.components.size;
    context.save();
    context.translate(position.x, position.y); 

    var alienColor = "#EB994D";
    var alienLineColor = "#F5B57A";


    //antennae
    context.fillStyle=alienColor;     
    context.strokeStyle=alienLineColor;
    context.lineWidth=0.002;
    var radius = 0.01;
    var midpt = {
		x : size.x + size.width/2,
		y : size.y + size.height/2
    }
    var leftAntennae = {
    	x : size.x + radius,
    	y : size.y+size.height - radius
    }
    var rightAntennae = {
    	x: size.x + size.width - radius,
    	y : size.y+size.height-radius
    }

    //line from Upper left "antennae" circle to midpt to Upper right "antennae" circle
    context.beginPath();
    context.moveTo(leftAntennae.x, leftAntennae.y);
    context.lineTo(midpt.x, midpt.y);
    context.lineTo(rightAntennae.x, rightAntennae.y, radius, 0, 2 * Math.PI);
    context.stroke();


    //Upper left "antennae" circle
    context.lineWidth=0.001;    
    context.beginPath();    
    context.arc(leftAntennae.x, leftAntennae.y, radius, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();


    //Upper right "antennae" circle
    context.beginPath();    
    context.arc(rightAntennae.x, rightAntennae.y, radius, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();


    //body
    context.beginPath();
    context.fillStyle=alienColor;
    context.strokeStyle=alienLineColor;
    context.lineWidth=0.001;
	context.moveTo( size.x, size.y );
	context.quadraticCurveTo(size.x, size.y+size.height, size.x+size.width/2, size.y+size.height);
	context.quadraticCurveTo(size.x+size.width, size.y+size.height, size.x+size.width, size.y );
    context.closePath();
    context.stroke();
    context.fill();

    //outer eye
    context.fillStyle="white";
    context.beginPath();    
    context.arc(midpt.x, midpt.y, 0.05, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();    

    //inner eye
    context.fillStyle=alienColor;
    context.beginPath();    
    context.arc(midpt.x, midpt.y, 0.03, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();

    //iris
    context.fillStyle="black";
    context.beginPath();    
    context.arc(midpt.x-0.01, midpt.y+0.01, 0.01, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();

    //mouth
    var mouth = {
        startX : size.x + (1/3)*size.width,
        startY : size.y + (1/4)*size.height,
        pt1X : size.x + 4/9 * size.width,
        pt1Y : size.y,
        pt2X : size.x + 5/9 * size.width,
        pt2Y : size.y,
        endX : size.x + (2/3)*size.width,
        endY : size.y + (1/4)*size.height,
    }

    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(mouth.startX, mouth.startY);
    context.bezierCurveTo(mouth.pt1X, mouth.pt1Y, mouth.pt2X, mouth.pt2Y, mouth.endX, mouth.endY);
    context.stroke();
    context.restore();


}

exports.PipeGraphicsComponent = PipeGraphicsComponent; 
},{}],5:[function(require,module,exports){
var StarFieldGraphicsComponent = function(entity){
	this.entity = entity;
};

StarFieldGraphicsComponent.prototype.draw = function(context){
	context.beginPath();
	var star;
	for(var i=0, j=this.entity.components.stars.length; i<j; i++) {
		star = this.entity.components.stars[i];
		star.x = star.x - star.vx;
    	
    	if(star.x < -2) {
			star.x= 2;
			star.y= Math.random();
			star.vx= Math.random() / 100;
			star.radius= Math.random()/100;
    	}
	    context.fillStyle = "white";
	    context.beginPath();
	    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, true);
	    context.fill();	    
	    context.closePath();
	}
}

exports.StarFieldGraphicsComponent = StarFieldGraphicsComponent; 
},{}],6:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],7:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");

var Bird = function(app){
	console.log("creating Bird entity");
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -1.7;
    this.type = "Bird";

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);

	this.components = {
        physics: physics,		
		graphics: graphics,
		collision: collision,
		app: app
	};
}

Bird.prototype.clearOnRestart = function(entity){
	return false;
}

Bird.prototype.onCollision = function(entity){
	if (entity.type != "PipeCheck"){	
		console.log("Bird collided with entity:", entity);
		//Restart the GUI
		this.components.app.restart(this);
	} else {
		console.log("Bird successfully cleared PipeCheck:", entity);
	}
}


exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":6}],8:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(size){
	console.log("creating Pipe entity");
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = 1;
  physics.acceleration.x = 0;
  physics.velocity.x = -0.55;
  this.type = "Pipe";

  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  //collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,		
    graphics: graphics,
    collision: collision,
    size: size
  };
}

Pipe.prototype.clearOnRestart = function(entity){
  return true;
}


exports.Pipe = Pipe;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":6}],9:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var PipeCheck = function(size, app){
	console.log("creating PipeCheck entity");
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.velocity.x = -0.55;
  this.type = "PipeCheck"; 
  this.info = app.successfulPipeCount;

  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,		
    collision: collision,
    size: size,
    entities: app.entities,
    app: app
  };
}

PipeCheck.prototype.clearOnRestart = function(entity){
  return true;
}

PipeCheck.prototype.onCollision = function(entity){
  //Remove self
  var i=this.components.entities.length; 
  while ( i--){
    if (this.components.entities[i] == this)
      this.components.entities.splice(i, 1);
  }
  this.components.app.scoreboard.increment();  
}


exports.PipeCheck = PipeCheck;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":6}],10:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/starField");

var StarField = function(app){
	console.log("creating StarField entity");
    this.type = "StarField";

	var graphics = new graphicsComponent.StarFieldGraphicsComponent(this);

	this.components = {	
		graphics: graphics,
		app: app,
		stars: []
	};

	for (i=0; i<30; i++){
		var star = {
			x: Math.random() * 4 - 2,
			y: Math.random(),
			vx: Math.random()/100,
			radius: Math.random()/100
		}
		this.components.stars.push(star);
	}
}

StarField.prototype.clearOnRestart = function(entity){
	return false;
}

exports.StarField = StarField;
},{"../components/graphics/starField":5}],11:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Wall = function(size, app){
	console.log("creating Wall entity");
  var physics = new physicsComponent.PhysicsComponent(this);
  this.type = "Wall";

  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    physics: physics,		
    collision: collision,
    size: size,
    entities: app.entities,
    app: app
  };
}

Wall.prototype.clearOnRestart = function(entity){
  return false;
}

Wall.prototype.onCollision = function(entity){
  console.log("Wall collided with entity:", entity);

  if (entity.type != "Bird"){
    //remove pipe entity
    var i=this.components.entities.length; 
    while ( i--){
      if (this.components.entities[i] == entity)
        this.components.entities.splice(i, 1);
    }
    console.log("Number of entities: " + this.components.entities.length);
  }

}

exports.Wall = Wall;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":6}],12:[function(require,module,exports){
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
},{"./entities/bird":7,"./entities/pipe":8,"./entities/pipeCheck":9,"./entities/starField":10,"./entities/wall":11,"./systems/graphics":14,"./systems/input":15,"./systems/physics":16,"./systems/scoreboard":17,"./systems/ui":18}],13:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!('collision' in entityA.components)) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!('collision' in entityB.components)) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;
},{}],14:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = "white";
};

GraphicsSystem.prototype.run = function() {
    // Start the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};


GraphicsSystem.prototype.tick = function() {
   // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save original context and setup coordinate system
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);


    // Rendering goes here
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!('graphics' in entity.components)) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }

    // Restore the original context
    this.context.restore();    

    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));    
};

exports.GraphicsSystem = GraphicsSystem;
},{}],15:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
	$("div#overlay").unbind("click.start");
	$("div#overlay").bind("click.flapBird", this.onClick.bind(this));
    //this.canvas.addEventListener('click', this.onClick.bind(this));
    //this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function(event) {	
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.stop = function(app){
	$("div#overlay").unbind("click.flapBird");
	$("div#overlay").bind("click.start", app.run.bind(app));	
}

exports.InputSystem = InputSystem;
},{}],16:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    this.intervalID = window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.stop = function() {
    window.clearInterval(this.intervalID);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!('physics' in entity.components)) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":13}],17:[function(require,module,exports){
var ScoreBoardSystem = function() {
    this.successfulPipeCount = 0;
    this.minToReachScoreboard = 0;
    this.maxNumOfScores = 10;
    this.scores = [];
    if (localStorage.getItem("scores") !== null){
        this.scores = JSON.parse(localStorage.getItem("scores"));
        if (this.scores.length == this.maxNumOfScores)
            this.minToReachScoreboard = Number(this.scores[this.scores.length-1].value);
    }
    this.updateGUI();
};

ScoreBoardSystem.prototype.save = function(ui) {
	//Show graphic to take in name
    if (this.successfulPipeCount > this.minToReachScoreboard){
        ui.newHighScore(this.successfulPipeCount);
    } else {
        ui.showScore(this.successfulPipeCount);
    }
};

ScoreBoardSystem.prototype.addNewScore = function(name){
    if (this.scores.length == this.maxNumOfScores){
        this.scores.pop();
    }
   
    this.scores.push({name: name, value: this.successfulPipeCount})
    this.scores.sort(function(a, b){
        if (Number(a.value) > Number(b.value)){
            return 1;
        } 
        if (Number(a.value) < Number(b.value)){ 
            return -1;
        }         
        return 0;   
    });         
    if (this.scores.length == this.maxNumOfScores){
        this.minToReachScoreboard = Number(this.scores[this.scores.length-1].value);
    }
    localStorage.setItem("scores", JSON.stringify(this.scores)); 
    this.updateGUI();     
}


ScoreBoardSystem.prototype.increment = function(){
	$("#counter").text(++this.successfulPipeCount);
};

ScoreBoardSystem.prototype.updateGUI = function(){
    $("#scoresTableBody").empty();
    var position=1;
    for (var i=this.scores.length-1; i >= 0; i--){
        $("#scoresTableBody")
            .append($("<tr>")
                .append($("<td class='numberTD'>")
                    .text(position)
                )
                .append($("<td>")
                    .text(this.scores[i].name)
                )
                .append($("<td class='numberTD'>")
                    .text(this.scores[i].value)
                )
            );
        position++;
    }
}

exports.ScoreBoardSystem = ScoreBoardSystem;

},{}],18:[function(require,module,exports){
var UISystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};


UISystem.prototype.start = function() {	
    $("#aboutToStartDiv").hide();         
    $("#countDiv").show();
    $("#counter").text("0");    
};

UISystem.prototype.stop = function(){
    $("#aboutToStartDiv").show();
    $("#clickToStart").text("Click the mouse button to play again.");
    $("#countDiv").hide();	
}

UISystem.prototype.showScore = function(newScore){
	$("#lastScore").show();
	$("#newHighScoreDiv").hide()
	$("#lastScore").text("You successfully passed " + newScore + " pairs of aliens!");
}

UISystem.prototype.newHighScore = function(newScore){
	$("div#overlay").unbind("click.start");
	$("#clickToStart").hide();
	$("#lastScore").hide();
	$("#newHighScoreDiv").show();
	$("#newHighScoreCount").text(newScore);
}

exports.UISystem = UISystem;
},{}],19:[function(require,module,exports){

var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var height = $(window).height()-$("nav").height() - $("header").height() - $("footer").height() - 38;
	$("canvas").css("height", height);
	$("div#overlay").css("height", height);
	$("div#overlay").css("top", $("canvas").position().top);
    var app = new flappyBird.FlappyBird();

    $("#start").click(function(){
    	$("#startDiv").hide();
    	$("#aboutToStartDiv").show();
        app.graphics.run();
        $("div#overlay").bind("click.start", function(event){
            if (event.target.id != "start"){
                app.run(); 
            }
        });    
    });

    $("#closeButton").click(function(){
        $("#scoreBoard").hide();
    });


    $("#saveHighScoreButton").click(function(){
        app.scoreboard.addNewScore($("#highScoreName").val());
        $("#clickToStart").show();   
        $("#newHighScoreDiv").hide();
        $("div#overlay").bind("click.start", function(event){
            if (event.target.id != "saveHighScoreButton"){
                app.run(); 
            }
        });          
    });

});

},{"./flappy_bird":12}]},{},[19]);
