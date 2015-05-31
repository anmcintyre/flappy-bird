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