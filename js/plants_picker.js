$(document).ready(() => {
	check_plants();
	
	// Setup game with picked plants
	$("#lets-rock").on('click', resize_back);

	// Go back home
	$("#ppkr-home").on('click', ppkr_back_home);
});

function resize_back() {
	$("#plant-picker-container").css("display","none");
	set_game(); // SETUP GAME
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

// Loads the animation ready set plant and sets up picked plants
function set_game() {
	$("#game-area").css("display","grid");
	$("#mp3").trigger("pause");

	ready_set_plant(); // Ready Set Plant...

	setTimeout(() => {
		// -----------> TODO Load picked plants

		// Load game scene background music 
		$("#mp3").attr('src', `./sounds/levels/${$("#game-area").attr("data-scene")}/back.mp3`);
		$("#mp3").get(0).play();

		// Resize background
		$("#game-area").css("background-size","135% 93%");
	}, 2500);

	setTimeout(() => {
		// Reveal settings & home buttons
		$("#g-btn-settings").css("opacity","1");
		$("#g-btn-home").css("opacity","1");
		$("#g-btn-pause").css("opacity","1");

		// Reveal top bar controls
		$("#top-bar").children().each((indx,elem) => {
			$(elem).css("opacity","1");
		});

		// Reveal plants in top bar
		plants_to_topbar();
	}, 3300);
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

// Function ready, set, plant
function ready_set_plant() {
	let words = [
		$("<span class='fill-text r-s-p' style='top:6%'>READY...</span>"),
		$("<span class='fill-text r-s-p' style='top:33%'>SET...</span>"),
		$("<span class='fill-text r-s-p' style='top:61%'>PLANT...</span>")
	];

	sfx_ready_set_plant(); // Calls the SFX
	$("#game-area").append(words[0]);
	setTimeout(() => {
		$("#game-area").append(words[1]);
	}, 700);
	setTimeout(() => {
		$("#game-area").append(words[2]);
	}, 1200);
	setTimeout(() => {
		$(".r-s-p").remove();
	}, 2500);
}

// Copies the chosen plants to the top bar
function plants_to_topbar() {
	let pkd_plants = $("#pkd-row").children();
	let seeds = new Array();

	for (let i of pkd_plants) {
		let li = $(`<li data-plant='${$(i).attr("data-plant")}'></li>`);
		li.css({
			"background": `url('./images/game/plants/seeds/${$(i).attr("data-plant")}.png') no-repeat`,
			"background-size": "100% 100%"
		});

		// MOUSE DOWN ON SEED PLANT AT TOP BAR 
		li.on('mousedown', seed_plant_picked);
		// ------------> TODO MOUSE UP ON CARTESIANO WHEN #game-area CURSOR IS grabbing

		seeds.push(li);
	}

	seeds.forEach((i) => $("#game-plants").append(i));
}