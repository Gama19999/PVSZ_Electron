function seed_plant_picked() {
	seedlift();
	if ($("#game-area").css("cursor") == "grabbing") 
		$("#game-area").css("cursor","default");
	else
		$("#game-area").css("cursor","grabbing");
}