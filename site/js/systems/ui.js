var UISystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};


UISystem.prototype.start = function() {	
    $("#aboutToStartDiv").hide();         
    $("#countDiv").show();
    $("#counter").text("0");    
};

UISystem.prototype.stop = function(){
    $("#aboutToStartDiv").show();
    $("#lastScore").text("You successfully passed " + $("#countDiv").text() + " pairs of aliens!");
    $("#clickToStart").text("Click the mouse button to play again.");
    $("#countDiv").hide();	
}

exports.UISystem = UISystem;