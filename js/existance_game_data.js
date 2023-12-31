// Check for existance of game data
function check_game_data() {
	let ajax = $.ajax({
		url: "./data/game",
		method: "post",
		dataType: "text"
	});

	ajax.done(function(respuesta) {
		$("#level").css({
			"background": "url('./images/controls/adventure-mod.png') no-repeat",
			"background-size": "100% 100%"
		});

		$("#level").val(respuesta.split('-')[0] + "   " + respuesta.split('-')[1]);
	});

	ajax.fail(function(jqXHR, status, error) {
		console.log(jqXHR, status, error);

		$("#level").css({
			"background": "url('./images/controls/new-game-mod.png') no-repeat",
			"background-size": "100% 100%"
		});

		$("#level").attr("data-new","1   1");
	});
}