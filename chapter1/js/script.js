var name = prompt("Enter your name");

function checkNumbers (checkString) {
	var numberIdtf = false;
	for (var i = 0; i < checkString.length; i++) {
		if(!isNaN(checkString.charAt(i))){
			numberIdtf = true;
		}			
	}

	return numberIdtf;
}

function inverseName (nameString){
	var reversedName = "";
	reversedName = nameString.split("").reverse().join("");
	console.log(reversedName);
}

function changeRegister(nameString){
	var newString = [];
	for (var i = 0; i < nameString.length; i++) {
		if(i%2 == 0){
			newString.push(nameString.charAt(i).toLowerCase());
		}
		else {
			newString.push(nameString.charAt(i).toUpperCase());
		}
	}

	console.log(newString.join(""));
	return nameString;
}

if(!checkNumbers(name)){
	inverseName(name);
}
else {
	changeRegister(name);
}
