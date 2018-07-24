function sendToServer(body) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/books', false);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.send(body);
}

function chooseFormToCreate() {
	var bookType = document.getElementById('choose-type');
	document.getElementById('hide').style.display = "none";

	bookType.classList.remove("choose-red");
	bookType.classList.add("choose - green");

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

function createBook() {
	var bookType = document.getElementById('choose-type');

	var book;
	var title = document.getElementById('title').value;
	var author = document.getElementById('author').value;
	var publishingHouse = document.getElementById('publishing-house').value;
	var year = document.getElementById('year').value;
	var audience = document.getElementById('audience').value;
	var description = document.getElementById('description').value;

	if (bookType.value == "audio") {
		var long = document.getElementById('long').value;
		var reader = document.getElementById('reader').value;
		book = new AudioBook(title, author, audience, description, publishingHouse, year, long, reader);
	}

	if (bookType.value == "studybook") {
		var science = document.getElementById('science').value;
		var illustration = document.getElementById('illustration').value;

		book = new StudyBook(title, author, audience, description, publishingHouse, year, science, illustration);
	}
	sendToServer(JSON.stringify(book));
	goToMainWindow();
}

function goToMainWindow() {
	window.location = "../index.html";
}

function Book(title, author, audience, description, publishingHouse, year) {
	this.title = title;
	this.author = author;
	this.audience = audience;
	this.description = description;
	this.publishingHouse = publishingHouse;
	this.year = year;
}

function AudioBook(title, author, audience, description, publishingHouse, year, long, reader) {
	Book.apply(this, arguments);
	this.long = long;
	this.reader = reader;
}

function StudyBook(title, author, audience, description, publishingHouse, year, science, illustration) {
	Book.apply(this, arguments);
	this.science = science;
	this.illustration = illustration;
}
AudioBook.prototype = Object.create(Book.prototype);
AudioBook.prototype.constructor = AudioBook;

StudyBook.prototype = Object.create(Book);
StudyBook.prototype.constructor = StudyBook;