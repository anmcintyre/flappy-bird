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