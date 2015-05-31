var PipeGraphicsComponent = function(entity){
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
    var position = this.entity.components.physics.position;
    context.save();
    context.translate(position.x, position.y);    
    context.beginPath();
    context.fillRect(0.5, 0, 0.15, this.entity.components.gapPosition);
    context.fillRect(0.5, 1, 0.15, -1*(1-0.20-this.entity.components.gapPosition));
    context.closePath();
    context.restore();
}

exports.PipeGraphicsComponent = PipeGraphicsComponent; 