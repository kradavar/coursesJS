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

function fillInTheTable() {
	let table = document.createElement('table');
	let tableInfo = "<thead><tr><th>#</th>" +
		"<th>Название</th><th>Автор</th><th>Издательство</th>" +
		"<th>Год издания</th><th>Краткое описание</th><th>Возраст аудитории</th>" +
		"<th> </th><th> </th></tr></thead><tbody>";
	let parent = document.getElementById('for-table');

	let allBooks = loadJSON();

	for (let i = 0; i < allBooks.length; i++) {

		let { title, author, publishingHouse, year, description, audience, id } = allBooks[i];
		tableInfo += "<tr><th scope=\"row\">" + (i + 1) + "</th><td>" +
			title + "</td><td>" +
			author + "</td><td>" +
			publishingHouse + "</td><td>" +
			year + "</td><td>" +
			description + "</td><td>" +
			audience + "</td>" +
			"<td><a href=\"./html/edit.html?" + id + "\" class = \"edit-href\">Редактировать </a>" +
			"<a href=\"#\" data-toggle=\"modal\" data-book-id = \"" +
			id + "\" data-target=\"#devare-book\" data-record-title=\"" +
			title + "\" class = \"devare-href\">Удалить</a></td><td><a href=\"./html/show.html?" +
			id + "\"><button type=\"button\" " +
			" class=\"btn btn-primary my-a-btn\">Подробнее</button></a></td>";
	}
	tableInfo += "</tbody>";
	table.innerHTML = tableInfo;
	table.className = "table table-bordered table-hover";
	parent.appendChild(table);
}

$('#devare-book').on('click', '.btn-ok', function(e) {
	let $modalDiv = $(e.delegateTarget);
	let id = $(this).data('bookId');
	let url = "http://localhost:3000/books/" + id;
	let xhr = new XMLHttpRequest();

	xhr.open('DELETE', url, false);
	xhr.send();
	$modalDiv.addClass('loading');
	setTimeout(function() {
		$modalDiv.modal('hide').removeClass('loading');
	}, 1000)

	location.reload();
});

$('#devare-book').on('show.bs.modal', function(e) {
	let data = $(e.relatedTarget).data();
	$('.title', this).text(data.recordTitle);
	$('.btn-ok', this).data('bookId', data.bookId);
});