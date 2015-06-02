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
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
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
    context.beginPath();
    context.fillRect(size.x, size.y, size.width, size.height);
    context.closePath();
    context.restore();
}

exports.PipeGraphicsComponent = PipeGraphicsComponent; 
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");

var Bird = function(app){
	console.log("creating Bird entity");
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -2;
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
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":5}],7:[function(require,module,exports){
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
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],8:[function(require,module,exports){
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
  console.log("PipeCheck collided with entity:", entity);

  //Remove self
  var i=this.components.entities.length; 
  while ( i--){
    if (this.components.entities[i] == this)
      this.components.entities.splice(i, 1);
  }
  console.log("Remove Pipecheck");
  $("#counter").text(++this.components.app.successfulPipeCount);
}


exports.PipeCheck = PipeCheck;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],9:[function(require,module,exports){
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
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],10:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var wall = require('./entities/wall');
var pipeCheck = require('./entities/pipeCheck')

var FlappyBird = function() {
    this.entities = [];
    this.entities.push(new bird.Bird(this));
    this.entities.push(new wall.Wall({x:-2, y:0, width:0.05, height:1}, this)); //left side (for pipes)
    this.entities.push(new wall.Wall({x:-2, y:-0.94, width:4, height:0.05}, this)); //bottom (for birds)
    this.entities.push(new wall.Wall({x:-2, y:1.01, width:4, height:0.05}, this)); //top  (for birds)

    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.successfulPipeCount = 0;
};

FlappyBird.prototype.run = function(event) {
        this.graphics.run();
        this.physics.run();
        this.input.run();
        this.gapSize = Number($("input[name=gapSize]:checked").val());
        this.intervalID = setInterval(this.addPipes.bind(this), 2000);  
        $("#aboutToStartDiv").hide();         
        $("#countDiv").show();
        this.successfulPipeCount = 0;
        $("#counter").text("0");
    };

FlappyBird.prototype.stop = function(){
    this.input.stop(this);
    this.graphics.stop();
    this.physics.stop();
    clearInterval(this.intervalID);
    $("#aboutToStartDiv").show();
    $("#countDiv").hide();
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
    this.entities.push(new pipeCheck.PipeCheck({x: 1.16, y: 0, width: 0.01, height: 1}, this));
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
},{"./entities/bird":6,"./entities/pipe":7,"./entities/pipeCheck":8,"./entities/wall":9,"./systems/graphics":12,"./systems/input":13,"./systems/physics":14}],11:[function(require,module,exports){
var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
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
},{}],12:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    this.animationRequestId = window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.stop = function() {
    // Stop the render loop
    window.cancelAnimationFrame(this.animationRequestId);
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
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":11}],15:[function(require,module,exports){

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
    	$.data("div#overlay", "app", app);
		$("div#overlay").bind("click.start", app.run.bind(app));
    });
});

},{"./flappy_bird":10}]},{},[15]);
