var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(size){
	console.log("creating Pipe entity");
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = 1;
  physics.acceleration.x = 0;
  physics.velocity.x = -0.75;

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


exports.Pipe = Pipe;