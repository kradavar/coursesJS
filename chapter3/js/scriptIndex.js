let allBooks = [];

let xhr = new XMLHttpRequest();
let table = document.createElement('table');
let tableInfo = "<thead><tr><th>#</th>" +
	"<th>Название</th><th>Автор</th><th>Издательство</th>" +
	"<th>Год издания</th><th>Краткое описание</th><th>Возраст аудитории</th>" +
	"<th> </th><th> </th></tr></thead><tbody>";
window.onload = fillInTheTable();

function loadJSON() {

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


function fillInTheTable() {

	allBooks = loadJSON();

	for (var i = 0; i < allBooks.length; i++) {
		tableInfo += "<tr><th scope=\"row\">" + allBooks[i].id + "</th><td>" +
			allBooks[i].title + "</td><td>" +
			allBooks[i].author + "</td><td>" +
			allBooks[i].publishingHouse + "</td><td>" +
			allBooks[i].year + "</td><td>" +
			allBooks[i].description + "</td><td>" +
			allBooks[i].audience + "</td>" +
			"<td><a href=\"./html/edit.html?" + allBooks[i].id + "\">Редактировать </a>" +
			"<a href=\"#\" data-toggle=\"modal\" data-record-id = \"" +
			allBooks[i].id + "\" data-target=\"#delete-book\" data-record-title=\"" +
			allBooks[i].title + "\">Удалить</a></td><td><button type=\"button\" " +
			" class=\"btn btn-primary my-a-btn\"><a href=\"./html/show.html?" +
			allBooks[i].id + "\">Подробнее</a></button></td>";
	}
	tableInfo += "</tbody>";
	table.innerHTML = tableInfo;
	let parent = document.getElementById('for-table');
	parent.appendChild(table);
	table.className = "table table-bordered table-hover";
}

$('#delete-book').on('click', '.btn-ok', function(e) {
	let $modalDiv = $(e.delegateTarget);
	let id = $(this).data('recordId');
	let address = "http://localhost:3000/books/" + id;
	xhr.open('DELETE', address, false);
	xhr.send();
	$modalDiv.addClass('loading');
	setTimeout(function() {
		$modalDiv.modal('hide').removeClass('loading');
	}, 1000)

	location.reload();
});
$('#delete-book').on('show.bs.modal', function(e) {
	let data = $(e.relatedTarget).data();
	$('.title', this).text(data.recordTitle);
	$('.btn-ok', this).data('recordId', data.recordId);
});