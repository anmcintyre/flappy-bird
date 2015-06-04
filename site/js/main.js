
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var height = $(window).height()-$("nav").height() - $("header").height() - $("footer").height() - 38;
	$("canvas").css("height", height);
	$("div#overlay").css("height", height);
	$("div#overlay").css("top", $("canvas").position().top);
    var app = new flappyBird.FlappyBird();

    $("#start").click(function(){
    	$("#startDiv").hide();
    	$("#aboutToStartDiv").show();
        app.graphics.run();
        $("div#overlay").bind("click.start", function(event){
            if (event.target.id != "start"){
                app.run(); 
            }
        });    
    });

    $("#closeButton").click(function(){
        $("#scoreBoard").hide();
    });


    $("#saveHighScoreButton").click(function(){
        app.scoreboard.addNewScore($("#highScoreName").val());
        $("#clickToStart").show();   
        $("#newHighScoreDiv").hide();
        $("div#overlay").bind("click.start", function(event){
            if (event.target.id != "saveHighScoreButton"){
                app.run(); 
            }
        });          
    });

});
