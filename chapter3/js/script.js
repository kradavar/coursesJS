let typeOfBook = document.getElementById('choose-type');

function chooseFormToCreate() {
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
	console.log(typeOfBook.value);
	switch(typeOfBook.value){
		case 'audio':
			let book = new AudioBook();
			book.setLong = document.getElementById('long').value;
			book.setReader = document.getElementById('reader').value;
			book.setTitle = document.getElementById('title').value;
			book.setAuthor = document.getElementById('auther').value;
			book.setYear = document.getElementById('year').value;
			book.setPubHouse = document.getElementById('publishing-house').value;
			book.setDescription = document.getElementById('description').value;
			book.setAudience = document.getElementById('audience').value;
		break;
		case 'studybook':
			let studybook = new StudyBook();
			studybook.setScience = document.getElementById('science').value;
			studybook.setIllustration = document.getElementById('inllustration').value;
			studybook.setTitle = document.getElementById('title').value;
			studybook.setAuthor = document.getElementById('auther').value;
			studybook.setYear = document.getElementById('year').value;
			studybook.setPubHouse = document.getElementById('publishing-house').value;
			studybook.setDescription = document.getElementById('description').value;
			studybook.setAudience = document.getElementById('audience').value;
		break;
	}
}

function Book(title, auther, publishingHouse, year, audience, description){
	this.setTitle = function(){
		this.title = title;
	}
	this.setAuthor = function(){
		this.auther = auther;
	}
	this.setPubHouse = function(){
		this.publishingHouse = publishingHouse;
	}
	this.setYear = function(){
		this.year = year;
	}
	this.setAudience = function(){
		this.audience = audience;
	}
	this.setDescription = function(){
		this.description = description;
	}

	this.getTitle = function(){
		return this.title;
	}
	this.getAuthor = function(){
		return this.auther;
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
	this.setReader = function(){
		this.reader = reader;
	}
	this.setLong = function(){
		this.long = long;
	}

	this.getReader = function(){
		return this.reader;
	}
	this.getLong = function(){
		return this.long;
	}
function StudyBook(){
	Book.call(this);
	this.setScience = function(){
		this.science = science;
	}
	this.setIllustration = function(){
		this.inllustration = inllustration;
	}

	this.getScience = function(){
		return this.science;
	}
	this.getIllustration = function(){
		return this.inllustration;
	}
}

}
