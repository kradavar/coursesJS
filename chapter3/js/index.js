window.onload = fillInTheTable();

function loadJSON() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/books', false);

	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		var textForParser = xhr.responseText;
		console.log(JSON.parse(textForParser));
		return JSON.parse(textForParser);
	}
}

function fillInTheTable() {
	var table = document.createElement('table');
	var tableInfo = "<thead><tr><th>#</th>" +
		"<th>Название</th><th>Автор</th><th>Издательство</th>" +
		"<th>Год издания</th><th>Краткое описание</th><th>Возраст аудитории</th>" +
		"<th> </th><th> </th></tr></thead><tbody>";
	var parent = document.getElementById('for-table');

	var allBooks = loadJSON();

	for (var i = 0; i < allBooks.length; i++) {
		tableInfo += "<tr><th scope=\"row\">" + (i + 1) + "</th><td>" +
			allBooks[i].title + "</td><td>" +
			allBooks[i].author + "</td><td>" +
			allBooks[i].publishingHouse + "</td><td>" +
			allBooks[i].year + "</td><td>" +
			allBooks[i].description + "</td><td>" +
			allBooks[i].audience + "</td>" +
			"<td><a href=\"./html/edit.html?" + +"\" class = \"edit-href\">Редактировать </a>" +
			"<a href=\"#\" data-toggle=\"modal\" data-book-id = \"" +
			allBooks[i].id + "\" data-target=\"#devare-book\" data-record-title=\"" +
			allBooks[i].title + "\" class = \"devare-href\">Удалить</a></td><td><a href=\"./html/show.html?" +
			allBooks[i].id + "\"><button type=\"button\" " +
			" class=\"btn btn-primary my-a-btn\">Подробнее</button></a></td>";
	}
	tableInfo += "</tbody>";
	table.innerHTML = tableInfo;
	table.className = "table table-bordered table-hover";
	parent.appendChild(table);
}

$('#devare-book').on('click', '.btn-ok', function(e) {
	var $modalDiv = $(e.delegateTarget);
	var id = $(this).data('bookId');
	var url = "http://localhost:3000/books/" + id;
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', url, false);
	xhr.send();
	$modalDiv.addClass('loading');
	setTimeout(function() {
		$modalDiv.modal('hide').removeClass('loading');
	}, 1000)

	location.reload();
});

$('#devare-book').on('show.bs.modal', function(e) {
	var data = $(e.relatedTarget).data();
	$('.title', this).text(data.recordTitle);
	$('.btn-ok', this).data('bookId', data.bookId);
});