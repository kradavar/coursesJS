function chooseFormToCreate() {
	let typeOfBook = document.getElementById('choose-type');

	if (typeOfBook.value == "audio") {
		document.getElementById('audio-form').style.display = "block";
		document.getElementById('studybook-form').style.display = "none";
	}

	if(typeOfBook.value == "studybook") {
		console.log("1");
		document.getElementById('audio-form').style.display = "none";
		document.getElementById('studybook-form').style.display = "block";
	}



}