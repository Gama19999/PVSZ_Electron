$(document).ready(() => {
	$("#home-container input[type='button']").each((indx, elem) => {
		$(elem).on('click', home_btn_click);
	});

	$("#game-area input[type='button']").each((indx, elem) => {
		$(elem).on('click', game_btn_click);
	});
});

function home_btn_click() {
	let tmp = new Audio('./sounds/SFX/SFX gravebutton.mp3');
	//tmp.volume = 0.8;
	tmp.play();
}

function game_btn_click() {
	let tmp = new Audio('./sounds/SFX/SFX buttonclick.mp3');
	tmp.volume = 0.5;
	tmp.play();
}