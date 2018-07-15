let allBooks = [];
let table = document.createElement('table');
let tabelInfo = "<thead><tr><th>#</th>" +
	"<th>Название</th><th>Автор</th><th>Издательство</th>" +
	"<th>Год издания</th><th>Краткое описание</th><th>Возраст аудитории</th>" +
	"<th> </th><th> </th></tr></thead><tbody>";
window.onload = fillInTheTable();

function loadJSON() {

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/books', false);

	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		let textForParser = xhr.responseText;
		console.log(JSON.parse(textForParser));
		return JSON.parse(textForParser);
	}
}

function deleteFromBase(book) {

}

function fillInTheTable() {

	allBooks = loadJSON();



	for (var i = 0; i < allBooks.length; i++) {

		tabelInfo += "<tr><th scope=\"row\">" + allBooks[i].id + "</th><td>" +
			allBooks[i].title + "</td><td>" +
			allBooks[i].author + "</td><td>" +
			allBooks[i].publishingHouse + "</td><td>" +
			allBooks[i].year + "</td><td>" +
			allBooks[i].description + "</td><td>" +
			allBooks[i].audience + "</td>" +
			"<td><a href=\"#\">Редактировать</a> " +
			"<a href=\"#delete-book\" data-toggle=\"modal\">Удалить</a>" +
			"</td><td><button type=\"button\" onclick = \"getMoreInfo(" + allBooks[i].id + ")\" class=\"btn btn-primary my-a-btn\">" +
			"Подробнее</button></td>";
	}
	tabelInfo += "</tbody>";
	table.innerHTML = tabelInfo;
	let parent = document.getElementById('for-table');
	parent.appendChild(table);
	table.className = "table table-bordered table-hover";


}