var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(xMax){
	console.log("creating Pipe entity");
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = 0.5;
    physics.acceleration.x = 0;
    physics.velocity.x = -0.75;

   var gapPosition = Math.random() * (0.75-0.25) + 0.25;
   console.log(gapPosition);

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components = {
        physics: physics,		
		graphics: graphics,
		gapPosition: gapPosition
	};
}

exports.Pipe = Pipe;