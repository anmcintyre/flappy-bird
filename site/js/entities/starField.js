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