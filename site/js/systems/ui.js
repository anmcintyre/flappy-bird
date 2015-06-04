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
    $("#clickToStart").text("Click the mouse button to play again.");
    $("#countDiv").hide();	
}

UISystem.prototype.showScore = function(newScore){
	$("#lastScore").show();
	$("#newHighScoreDiv").hide()
	$("#lastScore").text("You successfully passed " + newScore + " pairs of aliens!");
}

UISystem.prototype.newHighScore = function(newScore){
	$("div#overlay").unbind("click.start");
	$("#clickToStart").hide();
	$("#lastScore").hide();
	$("#newHighScoreDiv").show();
	$("#newHighScoreCount").text(newScore);
}

exports.UISystem = UISystem;