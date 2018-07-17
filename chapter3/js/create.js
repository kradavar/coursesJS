function loadJSON() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/books', false);
	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		return JSON.parse(xhr.responseText);
	}
}

function sendToServer(body) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/books', false);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.send(body);
}

function chooseFormToCreate() {
	let elements = document.getElementsByClassName('text-info');
	let bookType = document.getElementById('choose-type');

	for (var i = 0; i < elements.length; i++) {
		elements[i].value = "";
	}

	if (bookType.value == "audio") {
		document.getElementById('audio-form').style.display = "block";
		document.getElementById('studybook-form').style.display = "none";

	}

	if (bookType.value == "studybook") {
		document.getElementById('audio-form').style.display = "none";
		document.getElementById('studybook-form').style.display = "block";
	}
}

function createBook() {
	let allBooks = loadJSON();
	let bookType = document.getElementById('choose-type');
	let book = {};

	// TODO: fix id problem
	book.id = allBooks.length + 1;
	book.title = document.getElementById('title').value;
	book.author = document.getElementById('author').value;
	book.publishingHouse = document.getElementById('publishing-house').value;
	book.year = document.getElementById('year').value;
	book.audience = document.getElementById('audience').value;
	book.description = document.getElementById('description').value;
	switch (bookType.value) {
		case 'audio':
			book.long = document.getElementById('long').value;
			book.reader = document.getElementById('reader').value;
			break;
		case 'studybook':
			book.science = document.getElementById('science').value;
			book.illustration = document.getElementById('illustration').checked;
			break;
		default:
			return alert("Выберите тип книги!");
	}

	sendToServer(JSON.stringify(book));
	goToMainWindow();
}

function goToMainWindow() {
	window.location = "../index.html";
}

function Book(title, author, publishingHouse, year, audience, description) {

	this.setTitle = function(title) {
		this.title = title;
	}
	this.setAuthor = function(author) {
		this.author = author;
	}
	this.setPubHouse = function(publishingHouse) {
		this.publishingHouse = publishingHouse;
	}
	this.setYear = function(year) {
		this.year = year;
	}
	this.setAudience = function(audience) {

		let regular = /(\d{1,2})-(\d{1,2})/;
		if (regular.test(audience)) {
			this.audience = audience;
		} else {
			alert("Введите значения наибольшего и наименьшего возрастов через тире!");
			document.getElementById('audience').value = "";
		}
	}
	this.setDescription = function(description) {
		this.description = description;
	}

	this.getTitle = function() {
		return this.title;
	}
	this.getAuthor = function() {
		return this.author;
	}
	this.getPubHouse = function() {
		return this.publishingHouse;
	}
	this.getYear = function() {
		return this.year;
	}
	this.getAudience = function() {
		return this.audience;
	}
	this.getDescription = function() {
		return this.description;
	}
}

function AudioBook() {
	Book.call(this);
	this.setReader = function(reader) {
		this.reader = reader;
	}
	this.setLong = function(long) {
		this.long = long;
	}

	this.getReader = function() {
		return this.reader;
	}
	this.getLong = function() {
		return this.long;
	}
}

function StudyBook() {
	Book.call(this);
	this.setScience = function(science) {
		this.science = science;
	}

	this.setIllustration = function(illustration) {

		this.illustration = illustration;

	}

	this.getScience = function() {
		return this.science;
	}
	this.getIllustration = function() {
		return this.illustration;
	}
}