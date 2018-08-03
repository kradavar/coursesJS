window.onload = loadBooks();

function loadJSON() {
	return fetch('http://localhost:3000/books').then(function(response) {
		if (response.ok) {
			return response.json();
		} else {
			alert("Ошибка" + response.status);
		}
	});
}

function loadBooks() {
	loadJSON().then(allBooks => fillInTheTable(allBooks));
}

function fillInTheTable(allBooks) {
	let table = document.createElement('table');
	let tableInfo = "<thead><tr><th>#</th>" +
		"<th>Название</th><th>Автор</th><th>Издательство</th>" +
		"<th>Год издания</th><th>Краткое описание</th><th>Возраст аудитории</th>" +
		"<th> </th><th> </th></tr></thead><tbody>";
	let parent = document.getElementById('for-table');

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

	fetch(url, {
		method: 'DELETE'
	}).then(function(response) {
		if (response.ok) {
			location.reload();
		}
	});

});

$('#devare-book').on('show.bs.modal', function(e) {
	let data = $(e.relatedTarget).data();
	$('.title', this).text(data.recordTitle);
	$('.btn-ok', this).data('bookId', data.bookId);
});

function findBook() {
	loadJSON().then(allBooks => {
		let parameter = document.getElementById('search-input').value;
		for (let book of allBooks) {
			if (book.title.toLowerCase() == parameter.toLowerCase()) {
				let url = "./html/show.html?" + book.id;
				window.location.assign(url);
				return false;
			}
		}
		return alert("Такой книги не найдено!");
	});
}