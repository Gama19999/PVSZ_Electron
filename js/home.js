$(document).ready(() => {
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
		//btn_click();
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
	
});