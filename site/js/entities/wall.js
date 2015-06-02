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