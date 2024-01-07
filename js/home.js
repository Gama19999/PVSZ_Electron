$(document).ready(() => {
	// Check for existance of game data
	check_game_data();

	// Music controls
	$("#mp3").attr('src', './sounds/intro.mp3');
	$("#mp3").get(0).play();

	// Settings button event handlers
	$("#btn-settings").on('click', () => {
		let visible = $("#div-settings").css("display") == "none" ? false : true;
		if (visible) $("#div-settings").css("display","none");
		else $("#div-settings").css("display","grid");
	});

	$("#vol-up").on('click', () => {
		let vol = $("#mp3").prop("volume");
		if ((vol + 0.1) > 1) return;
		$("#mp3").prop("volume", vol+=0.1);
	});

	$("#vol-mut").on('click', () => {
		let mute = $("#vol-mut").attr("data-mute") == 'false' ? false : true;
		if (!mute) {
			$("#vol-mut").css("background","url('./images/controls/unmute.png') no-repeat");
			$("#mp3").trigger("pause");
			$("#vol-mut").attr("data-mute","true");
		} else {
			$("#vol-mut").css("background","url('./images/controls/mute.png') no-repeat");
			$("#mp3").trigger("play");
			$("#vol-mut").attr("data-mute","false");
		}
	});

	$("#vol-down").on('click', () => {
		let vol = $("#mp3").prop("volume");
		if ((vol - 0.1) < 0) return;
		$("#mp3").prop("volume", vol-=0.1);
	});

	$("#level").on('click', () => {
		let value = $("#level").val();
		let scene = value != '' ? value.substring(0,1) : 1;
		let lvl = value != '' ? value[value.length-2] : 1;

		// --------> TODO process lvl

		start_game(scene, lvl);
	});
	
});

function start_game(scene, lvl) {
	$("#home-container").css("display","none");

	// --------> TODO process lvl
	/*switch (lvl) {

	}*/

	$("#plant-picker-container").css({
		"background": `url('./images/game/levels/${scene}/back.png') no-repeat`,
		"background-size": "100% 100%",
		"display": "flex"
	});

	$("#game-area").css({
		"background": `url('./images/game/levels/${scene}/back.png') no-repeat`,
		"background-size": "100% 100%"
	});

	$("#game-area").attr("data-scene",`${scene}`);

	$("#mp3").attr('src', `./sounds/levels/Choose Your Seeds.mp3`);
	$("#mp3").get(0).play();
}