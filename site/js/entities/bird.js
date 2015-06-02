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