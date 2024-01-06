$(document).ready(() => {
	check_plants();
	
	// Start game with picked plants
	$("#lets-rock").on('click', resize_back);

	$("#ppkr-home").on('click', ppkr_back_home);
});

function resize_back() {
	$("#plant-picker-container").css("display","none");
	ready_set_plant(); // Init game
}

// Returns to home
function ppkr_back_home() {
	$("#plant-picker-container").css("display","none");

	// Unpick any plant seleted and change css
	for (let i of $("#pkd-row").children()) {
		pkd_plant_clicked(i, false);
	}

	$("#home-container").css("display","grid");
	$("#mp3").attr('src', `./sounds/intro.mp3`);
	$("#mp3").get(0).play();
}

// Starts the animation ready set plant and loads picked plants
function ready_set_plant() {
	$("#game-area").css("display","grid");

	setTimeout(() => {
		// TODO Ready Set Plant ....
		// TODO Load picked plants

		// Reveal settings & home buttons
		$("#g-btn-settings").css("opacity","1");
		$("#g-btn-home").css("opacity","1");
		$("#g-btn-pause").css("opacity","1");

		$("#game-area").css("background-size","135% 93%");
	}, 2000);
}

// Retrieves all unlocked plants
function check_plants() {
	let plants = new Map();

	let ajax_plants = $.ajax({
		url: "./data/green",
		method: "post",
		dataType: "text"
	});

	ajax_plants.done(function(respuesta) {
		let temp = respuesta.split("\n");
		for (let i of temp) {
			if (i == "") break;
			plants.set(i.split("-")[0], i.split("-")[1]);
		}

		fill_owned_plants(plants);
	});

	ajax_plants.fail(function(jqXHR, status, error) {
		console.log(jqXHR, status, error);
	});
}

// Fills the plants table picker with unlocked ones 
function fill_owned_plants(plants) {
	let tbody = $("#tbody-plant-picker");
	let all = 0;
	let cols = 0;
	let row = $("<tr></tr>");

	for ([num,plant] of plants) {
		let td = $(`<td id='${num}' onclick='owned_clicked(this)'></td>`);

		td.css({
			"background": `url('./images/game/plants/seeds/${num}.png') no-repeat`,
			"background-size": "75px 6.5rem"
		});

		row.append(td);

		cols++;
		all++;

		if (all == plants.size) {
			tbody.append(row);
		} else if (cols == 9) {
			tbody.append(row);
			row = $("<tr></tr>");
			cols = 0;
		}
	}
}

// Event handler for owned plant clicked
function owned_clicked(self) {
	let pkds = $("#pkd-row");
	let size = pkds.children().length;
	let idPlant = $(self).attr("id");

	// Maxium allowed picked already
	if (size == 9) {
		buzzer();
		return;
	}

	// Check for the same plant picked
	for (let i of pkds.children()) {
		if (idPlant == $(i).attr("data-plant")) {
			buzzer();
			return;
		}
	}

	seedlift();

	let td = $(`<td id='pkd-${idPlant}' data-plant='${idPlant}' onclick='pkd_plant_clicked(this, true)'></td>`);

	$(self).css("filter","brightness(0.6)");

	td.css({
		"background": `url('./images/game/plants/seeds/${idPlant}.png') no-repeat`,
		"background-size": "75px 6.5rem"
	});

	pkds.append(td);
}

// Event handler for already picked plant clicked
function pkd_plant_clicked(self, sfx) {
	let idSelf = $(self).attr("id");
	let idPlant = $(self).attr("data-plant");

	if (sfx) seedlift();

	$(`#${idPlant}`).css("filter","brightness(1.0)");
	$(`#${idSelf}`).remove();
}