
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
    	$.data("div#overlay", "app", app);
		$("div#overlay").bind("click.start", app.run.bind(app));
    });
});
