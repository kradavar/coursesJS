import { sendJSON } from "./json";
import AudioBook from "./AudioBook";
import StudyBook from "./StudyBook";

function chooseFormToCreate() {
	let bookType = document.getElementById('choose-type');
	document.getElementById('hide').style.display = "none";

	bookType.classList.remove("choose-red");
	bookType.classList.add("choose-green");

	if (bookType.value == "audio") {
		document.getElementById('audio-form').style.display = "block";
		document.getElementById('studybook-form').style.display = "none";
		document.getElementById('reader').required = true;
		document.getElementById('long').required = true;
		document.getElementById('science').required = false;
	}

	if (bookType.value == "studybook") {
		document.getElementById('audio-form').style.display = "none";
		document.getElementById('studybook-form').style.display = "block";
		document.getElementById('reader').required = false;
		document.getElementById('long').required = false;
		document.getElementById('science').required = true;

	}
	document.getElementById('general').style.display = "block";
	document.getElementById('create-book-btn').disabled = false;
}

const getFormValues = () => {
	let formValues = [];
	formValues.push(document.getElementById('title').value);
	formValues.push(document.getElementById('author').value);
	formValues.push(document.getElementById('audience').value);
	formValues.push(document.getElementById('description').value);
	formValues.push(document.getElementById('publishing-house').value);
	formValues.push(document.getElementById('year').value);
	return formValues;
}

function createBook() {
	let bookType = document.getElementById('choose-type');
	let book;
	const bookParams = getFormValues();

	if (bookType.value == "audio") {
		let long = document.getElementById('long').value;
		let reader = document.getElementById('reader').value;
		book = new AudioBook(...bookParams, long, reader);
	}

	if (bookType.value == "studybook") {
		let science = document.getElementById('science').value;
		let illustration = document.getElementById('illustration').value;

		book = new StudyBook(...bookParams, science, illustration);
	}
	sendJSON("POST", "http://localhost:3000/books", book);
}

document.getElementById("choose-type").addEventListener('change', chooseFormToCreate);
document.getElementById("create-form").addEventListener('submit', (event) => {
	event.preventDefault();
	createBook();
});