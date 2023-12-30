$(document).ready(() => {
	$("#lets-rock").on('click', resize_back);
});

function resize_back() {
	$("#plant-picker-container").css("display","none");
	ready_set_plant();
}

function ready_set_plant() {
	$("#game-area").css("display","grid");

	setTimeout(() => {
		// TODO Ready Set Plant ....

		$("#game-area").css("background-size","137% 90%");

		// Reveal settings button
		$("#g-btn-settings").css("opacity","1");
	}, 2000);
}