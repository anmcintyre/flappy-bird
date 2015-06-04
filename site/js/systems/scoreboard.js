var ScoreBoardSystem = function() {
    this.successfulPipeCount = 0;
    this.minToReachScoreboard = 0;
    this.maxNumOfScores = 10;
    this.scores = [];
    if (localStorage.getItem("scores") !== null){
        this.scores = JSON.parse(localStorage.getItem("scores"));
        if (this.scores.length == this.maxNumOfScores)
            this.minToReachScoreboard = Number(this.scores[this.scores.length-1].value);
    }
    this.updateGUI();
};

ScoreBoardSystem.prototype.save = function(ui) {
	//Show graphic to take in name
    if (this.successfulPipeCount > this.minToReachScoreboard){
        ui.newHighScore(this.successfulPipeCount);
    } else {
        ui.showScore(this.successfulPipeCount);
    }
};

ScoreBoardSystem.prototype.addNewScore = function(name){
    if (this.scores.length == this.maxNumOfScores){
        this.scores.pop();
    }
   
    this.scores.push({name: name, value: this.successfulPipeCount})
    this.scores.sort(function(a, b){
        if (Number(a.value) > Number(b.value)){
            return 1;
        } 
        if (Number(a.value) < Number(b.value)){ 
            return -1;
        }         
        return 0;   
    });         
    if (this.scores.length == this.maxNumOfScores){
        this.minToReachScoreboard = Number(this.scores[this.scores.length-1].value);
    }
    localStorage.setItem("scores", JSON.stringify(this.scores)); 
    this.updateGUI();     
}


ScoreBoardSystem.prototype.increment = function(){
	$("#counter").text(++this.successfulPipeCount);
};

ScoreBoardSystem.prototype.updateGUI = function(){
    $("#scoresTableBody").empty();
    var position=1;
    for (var i=this.scores.length-1; i >= 0; i--){
        $("#scoresTableBody")
            .append($("<tr>")
                .append($("<td class='numberTD'>")
                    .text(position)
                )
                .append($("<td>")
                    .text(this.scores[i].name)
                )
                .append($("<td class='numberTD'>")
                    .text(this.scores[i].value)
                )
            );
        position++;
    }
}

exports.ScoreBoardSystem = ScoreBoardSystem;
