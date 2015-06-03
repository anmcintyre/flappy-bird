var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = "white";
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    this.animationRequestId = window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.stop = function() {
    // Stop the render loop
    window.cancelAnimationFrame(this.animationRequestId);
};

GraphicsSystem.prototype.tick = function() {
   // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save original context and setup coordinate system
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);


    // Rendering goes here
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!('graphics' in entity.components)) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }

    // Restore the original context
    this.context.restore();    

    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));    
};

exports.GraphicsSystem = GraphicsSystem;