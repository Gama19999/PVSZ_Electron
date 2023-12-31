$(document).ready(() => {
	$("#home-container input[type='button']").each((indx, elem) => {
		$(elem).on('click', home_btn_click);
	});

	$("#g-div-settings input[type='button']").each((indx, elem) => {
		$(elem).on('click', game_btn_click);
	});
});

function home_btn_click() {
	new Audio('./sounds/SFX/SFX gravebutton.mp3').play();
}

function game_btn_click() {
	new Audio('./sounds/SFX/SFX buttonclick.mp3').play();
}

function buzzer() {
	new Audio('./sounds/SFX/SFX buzzer.mp3').play();
}

function seedlift() {
	new Audio('./sounds/SFX/SFX seedlift.mp3').play();
}

function sfx_pause() {
	new Audio('./sounds/SFX/SFX pause.mp3').play();
}

function sfx_ready_set_plant() {
	new Audio('./sounds/SFX/SFX readysetplant.mp3').play();
}

function siren() {
	new Audio('./sounds/SFX/SFX siren.mp3').play();
}