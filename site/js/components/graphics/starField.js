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