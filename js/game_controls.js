$(document).ready(() => {
	// Settings button event handlers
	$("#g-btn-settings").on('click', () => {
		let visible = $("#g-div-settings").css("display") == "none" ? false : true;
		if (visible) $("#g-div-settings").css("display","none");
		else $("#g-div-settings").css("display","grid");
	});

	$("#g-vol-up").on('click', () => {
		let vol = $("#mp3").prop("volume");
		if ((vol + 0.1) > 1) return;
		$("#mp3").prop("volume", vol+=0.1);
	});

	$("#g-vol-mut").on('click', () => {
		let mute = $("#g-vol-mut").attr("data-mute") == 'false' ? false : true;
		if (!mute) {
			$("#g-vol-mut").css("background","url('./images/controls/unmute.png') no-repeat");
			$("#mp3").trigger("pause");
			$("#g-vol-mut").attr("data-mute","true");
		} else {
			$("#g-vol-mut").css("background","url('./images/controls/mute.png') no-repeat");
			$("#mp3").trigger("play");
			$("#g-vol-mut").attr("data-mute","false");
		}
	});

	$("#g-vol-down").on('click', () => {
		let vol = $("#mp3").prop("volume");
		if ((vol - 0.1) < 0) return;
		$("#mp3").prop("volume", vol-=0.1);
	});

	// Home button handler
	$("#g-btn-home").on('click', to_home);

	// Pause button handler
	$("#g-btn-pause").on('click', game_pause);

	// Cancel go to home handler
	$("#g-btn-cancel").on('click', () => {
		$("#leaving-game").css("display","none");
		game_pause();
	});

	// TODO Confirm go to home handler
	//$("#g-btn-confirm").on('click');
});

function game_pause() {
	let btn = $("#g-btn-pause");
	let onpause = btn.attr("data-pause") == "false" ? false : true;

	if (onpause) {
		game_btn_click();
		$("#mp3").trigger("play");
		$("#pause-text").css("display","none");
		btn.attr("data-pause","false");
		btn.css({
			"background": "url('./images/controls/pause.png') no-repeat",
			"background-size": "60px 60px"
		});
	} else {
		sfx_pause();
		$("#mp3").trigger("pause");
		$("#pause-text").css("display","flex");
		btn.attr("data-pause","true");
		btn.css({
			"background": "url('./images/controls/play.png') no-repeat",
			"background-size": "60px 60px"
		});
	}
}

function to_home() {
	$("#g-btn-pause").trigger("click");
	$("#leaving-game").css("display","grid");
}