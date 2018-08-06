window.onload = loadBooks();

let getTypeOfSearch = () => { return document.getElementById("select-search").value }

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
	loadJSON().then(allBooks => {
		let parent = document.getElementById('for-table');
		fillInTheTable(allBooks, parent);
	});
}

function fillInTheTable(books, parent) {
	let table = document.createElement('table');
	let tableInfo = "<thead><tr><th>#</th>" +
		"<th>Название</th><th>Автор</th><th>Издательство</th>" +
		"<th>Год издания</th><th>Краткое описание</th><th>Возраст аудитории</th>" +
		"<th> </th><th> </th></tr></thead><tbody>";

	for (let i = 0; i < books.length; i++) {

		let { title, author, publishingHouse, year, description, audience, id } = books[i];
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


let searchByTitle = (parameter, books) => {
	let results = [];
	for (let book of books) {
		if (book.title.toLowerCase() === parameter.toLowerCase()) {
			results.push(book);
		}
	}
	return results;
}

let searchByAuthor = (parameter, books) => {
	let results = [];
	for (let book of books) {
		if (book.author.toLowerCase().includes(parameter.toLowerCase())) {
			results.push(book);
		}
	}
	return results;
}

let searchByPublishingHouse = (parameter, books) => {
	let results = [];
	for (let book of books) {
		if (book.publishingHouse.toLowerCase() === parameter.toLowerCase()) {
			results.push(book);
		}
	}
	return results;
}

let searchByYear = (parameter, books) => {
	let results = [];
	for (let book of books) {
		if (book.year == parameter) {
			results.push(book);
		}
	}
	return results;
}

function findBook() {
	loadJSON().then(allBooks => {
		let parameter = document.getElementById('search-input').value;
		let books = [];

		switch (getTypeOfSearch()) {
			case 'title':
				books = searchByTitle(parameter, allBooks);
				break;
			case 'author':
				books = searchByAuthor(parameter, allBooks);
				break;
			case 'publishingHouse':
				books = searchByPublishingHouse(parameter, allBooks);
				break;
			case 'year':
				parameter = +parameter;
				books = searchByYear(parameter, allBooks);
				break;
		}

		showModalSearch(books);

	});
}

function showModalSearch(books) {
	let modal = document.getElementById("search-results");

	let parentDiv = document.getElementById("search-modal-body");

	parentDiv.innerHTML = "";

	if (books.length != 0) {
		fillInTheTable(books, parentDiv);
	} else {
		let message = document.createElement("p");
		message.innerHTML = "Книг по вашему запросу не найдено, проверьте параметры поиска.";
		parentDiv.appendChild(message);
	}

	$("#search-results").modal();


}

function changePlaceholder() {
	let input = document.getElementById("search-input");

	switch (getTypeOfSearch()) {
		case 'title':
			input.placeholder = "Введите название книги...";
			break;
		case 'author':
			input.placeholder = "Введите имя автора...";
			break;
		case 'publishingHouse':
			input.placeholder = "Введите название издательства...";
			break;
		case 'year':
			input.placeholder = "Введите год издания...";
			break;

	}


}