var ScoreBoardSystem = function() {
    this.successfulPipeCount = 0;
};

ScoreBoardSystem.prototype.save = function() {
	//Show graphic to take in name
    //Store the score
};

ScoreBoardSystem.prototype.display = function() {	
    //View the scoreboard
};

ScoreBoardSystem.prototype.increment = function(){
	$("#counter").text(++this.successfulPipeCount);
}

exports.ScoreBoardSystem = ScoreBoardSystem;