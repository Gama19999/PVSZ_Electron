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
});