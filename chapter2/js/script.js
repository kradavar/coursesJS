function goToGoogle() {
	window.open("https://www.google.com/");
}

function addPicture(){
	document.write("<img src='img/hedgehog.jpg'>");
}

function Human(){
	this.name = "";
	this.lastname = "";
	this.age = 0;
	this.gender = "";
	this.favColor = "";
}

function createObject(){
	var myObject = new Human();
	myObject.name = "Darya";
	myObject.lastname = "Krasava";
	myObject.age = 20;
	myObject.gender = "fem";
	myObject.favColor = "green";

	console.log(myObject);

	var retrStr = "";

	for (var key in myObject){

		retrStr += key + ": " + myObject[key] + "<br>";
	}

	var newDiv = document.createElement('div');

	newDiv.innerHTML = "<strong>"+typeof(myObject)+"</strong>:<br>"+ retrStr;

	document.body.appendChild(newDiv);

}