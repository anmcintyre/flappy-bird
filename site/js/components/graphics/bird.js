var BirdGraphicsComponent = function(entity){
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context){
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);

    //"ship"
    context.beginPath();
    context.fillStyle="black";
    context.strokeStyle="gray"; 
    context.lineWidth=0.001;
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);   
    context.closePath();
    context.fill();
    context.stroke();     

    //red bird body
    context.beginPath();
    context.fillStyle="#318690";
    context.strokeStyle="#318690";
    context.lineWidth=0.008;
    context.arc(0, 0, 0.008, 0, 2 * Math.PI);    
    context.closePath();
    context.fill();
    context.stroke();    

    //bird beak
    context.beginPath();
    context.fillStyle="yellow";
    context.strokeStyle="#FF8F35";
    context.lineWidth=0.001;
    context.moveTo(.008,0.006);
    context.lineTo(.017,0.0);
    context.lineTo(.008,-0.006);
    context.closePath();
    context.fill();
    context.stroke();   

    context.beginPath();
    context.strokeStyle="#black";
    context.lineWidth=0.001;
    context.moveTo(.017,0.0);
    context.lineTo(.008,0.0);
    context.closePath();
    context.stroke();   


    //eye
   	context.beginPath();
    context.fillStyle="white";
    context.strokeStyle="white"; 
    context.lineWidth=0.001;
    context.arc(.002, 0.006, 0.003, 0, 2 * Math.PI);   
    context.closePath();
    context.fill();
    context.stroke();    
    context.closePath();
    context.fill();
    context.stroke(); 

   	context.beginPath();
    context.fillStyle="black";
    context.strokeStyle="black"; 
    context.lineWidth=0.001;
    context.arc(.002, 0.006, 0.001, 0, 2 * Math.PI);   
    context.closePath();
    context.fill();
    context.stroke();    
    context.closePath();
    context.fill();
    context.stroke();     

    //wing
    context.beginPath();
    context.fillStyle="#318690";
    context.strokeStyle="black";
    context.lineWidth=0.001;
    context.moveTo(-0.006,0.01);
    context.lineTo(0,0);
    context.lineTo(-0.006, -0.01);
    context.lineTo(-0.019,0);
    context.closePath();
    context.fill();
    context.stroke();     

    context.restore();
}

exports.BirdGraphicsComponent = BirdGraphicsComponent; 