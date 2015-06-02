var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
	$("div#overlay").unbind("click.start");
	$("div#overlay").bind("click.flapBird", this.onClick.bind(this));
    //this.canvas.addEventListener('click', this.onClick.bind(this));
    //this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function(event) {	
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.stop = function(app){
	$("div#overlay").unbind("click.flapBird");
	$("div#overlay").bind("click.start", app.run.bind(app));	
}

exports.InputSystem = InputSystem;