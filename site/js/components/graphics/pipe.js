var PipeGraphicsComponent = function(entity){
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
    var position = this.entity.components.physics.position;
    var size = this.entity.components.size;
    context.save();
    context.translate(position.x, position.y); 

    var alienColor = "#EB994D";
    var alienLineColor = "#F5B57A";


    //antennae
    context.fillStyle=alienColor;     
    context.strokeStyle=alienLineColor;
    context.lineWidth=0.002;
    var radius = 0.01;
    var midpt = {
		x : size.x + size.width/2,
		y : size.y + size.height/2
    }
    var leftAntennae = {
    	x : size.x + radius,
    	y : size.y+size.height - radius
    }
    var rightAntennae = {
    	x: size.x + size.width - radius,
    	y : size.y+size.height-radius
    }

    //line from Upper left "antennae" circle to midpt to Upper right "antennae" circle
    context.beginPath();
    context.moveTo(leftAntennae.x, leftAntennae.y);
    context.lineTo(midpt.x, midpt.y);
    context.lineTo(rightAntennae.x, rightAntennae.y, radius, 0, 2 * Math.PI);
    context.stroke();


    //Upper left "antennae" circle
    context.lineWidth=0.001;    
    context.beginPath();    
    context.arc(leftAntennae.x, leftAntennae.y, radius, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();


    //Upper right "antennae" circle
    context.beginPath();    
    context.arc(rightAntennae.x, rightAntennae.y, radius, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();


    //body
    context.beginPath();
    context.fillStyle=alienColor;
    context.strokeStyle=alienLineColor;
    context.lineWidth=0.001;
	context.moveTo( size.x, size.y );
	context.quadraticCurveTo(size.x, size.y+size.height, size.x+size.width/2, size.y+size.height);
	context.quadraticCurveTo(size.x+size.width, size.y+size.height, size.x+size.width, size.y );
    context.closePath();
    context.stroke();
    context.fill();

    //outer eye
    context.fillStyle="white";
    context.beginPath();    
    context.arc(midpt.x, midpt.y, 0.05, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();    

    //inner eye
    context.fillStyle=alienColor;
    context.beginPath();    
    context.arc(midpt.x, midpt.y, 0.03, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();

    //iris
    context.fillStyle="black";
    context.beginPath();    
    context.arc(midpt.x-0.01, midpt.y+0.01, 0.01, 0, 2 * Math.PI); 
    context.closePath();
    context.fill();


    context.restore();


}

exports.PipeGraphicsComponent = PipeGraphicsComponent; 