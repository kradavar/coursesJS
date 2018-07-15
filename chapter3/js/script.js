let typeOfBook = document.getElementById('choose-type');
let allBooks = []; // для работы с таблицей главной стр в будущем


function chooseFormToCreate() {

	let elements = document.getElementsByClassName('text-info');

	for (var i = 0; i < elements.length; i++) {
		elements[i].value = "";
	}

	if (typeOfBook.value == "audio") {
		document.getElementById('audio-form').style.display = "block";
		document.getElementById('studybook-form').style.display = "none";

	}

	if(typeOfBook.value == "studybook") {
		document.getElementById('audio-form').style.display = "none";
		document.getElementById('studybook-form').style.display = "block";
	}
}

function createBook(){

	let newBook;

	switch(typeOfBook.value) {
		case 'audio': 
			newBook = new AudioBook();
			newBook.setLong(document.getElementById('long').value);
			newBook.setReader(document.getElementById('reader').value);
			break;
		case 'studybook': 
			newBook = new StudyBook();
			newBook.setScience(document.getElementById('science').value);
	 		newBook.setIllustration(document.getElementById('illustration').checked);
	 		break;
	 	default: 
	 		return alert("Выберите тип книги!");
	}

	newBook.setTitle(document.getElementById('title').value);
	newBook.setAuthor(document.getElementById('author').value);
	newBook.setYear(document.getElementById('year').value);
	newBook.setPubHouse(document.getElementById('publishing-house').value);
	newBook.setDescription(document.getElementById('description').value);
	newBook.setAudience(document.getElementById('audience').value);

	allBooks.push(newBook);

	console.log(newBook);
}

/*
function chooseFunction(){
	let checkedTitle = document.getElementById('title').value;
	let changeFunction = false;

	for (var i = 0; i < allBooks.length; i++) {
		if(allBooks[i].getTitle() == checkedTitle){
			changeFunction = true;
			changeBookInfo(allBooks[i]);
		}
	}

	if (!changeFunction){
		createBook();
	}
}

function changeBookInfo(book){
	book.setTitle(document.getElementById('title').value);
	book.setAuthor(document.getElementById('author').value);
	book.setYear(document.getElementById('year').value);
	book.setPubHouse(document.getElementById('publishing-house').value);
	book.setDescription(document.getElementById('description').value);
	book.setAudience(document.getElementById('audience').value);

	if(book instanseof AudioBook){
		book.setLong(document.getElementById('long').value);
		book.setReader(document.getElementById('reader').value);
	}

	if (book instanseof StudyBook) {
		book.setScience(document.getElementById('science').value);
	 	book.setIllustration(document.getElementById('illustration').checked);
	}
}
*/

function Book(title, author, publishingHouse, year, audience, description){

	this.setTitle = function(title){
		this.title = title;
	}
	this.setAuthor = function(author){
		this.author = author;
	}
	this.setPubHouse = function(publishingHouse){
		this.publishingHouse = publishingHouse;
	}
	this.setYear = function(year){
		this.year = year;
	}
	this.setAudience = function(audience){

		let regular = /(\d{1,2})-(\d{1,2})/;
		if(regular.test(audience)){
			this.audience = audience;
		}
		alert("Введите значения наибольшего и наименьшего возрастов через тире!");
		document.getElementById('audience').value = "";		
	}
	this.setDescription = function(description){
		this.description = description;
	}

	this.getTitle = function(){
		return this.title;
	}
	this.getAuthor = function(){
		return this.author;
	}
	this.getPubHouse = function(){
		return this.publishingHouse;
	}
	this.getYear = function(){
		return this.year;
	}
	this.getAudience = function(){
		return this.audience;
	}
	this.getDescription = function(){
		return this.description;
	}
}

function AudioBook(){
	Book.call(this);
	this.setReader = function(reader){
		this.reader = reader;
	}
	this.setLong = function(long){
		this.long = long;
	}

	this.getReader = function(){
		return this.reader;
	}
	this.getLong = function(){
		return this.long;
	}
}	

function StudyBook(){
	Book.call(this);
	this.setScience = function(science){
		this.science = science;
	}

	this.setIllustration = function(illustration){

		this.illustration = illustration;
		
	}

	this.getScience = function(){
		return this.science;
	}
	this.getIllustration = function(){
		return this.illustration;
	}
}