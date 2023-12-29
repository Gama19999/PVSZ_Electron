$(document).ready(() => {
	$("input[type='button']").each((indx, elem) => {
		$(elem).on('click', btn_click);
	});
});

function btn_click() {
	let tmp = new Audio('./sounds/SFX/SFX buttonclick.mp3');
	tmp.volume = 0.5;
	tmp.play();
}