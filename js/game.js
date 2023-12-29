$(document).ready(() => {
	$("#test").on('click', resize_back);
});

function resize_back() {
	$("#game-container").css("background-size","137% 90%");
}