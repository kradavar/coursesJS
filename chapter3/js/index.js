import loadJSON from "./json";
import { findBook, changePlaceholder } from "./search";
import fillInTheTable from "./Table";
import 'bootstrap';

window.onload = loadBooks();

function loadBooks() {
	loadJSON('http://localhost:3000/books').then(allBooks => {
		let parent = document.getElementById('for-table');
		fillInTheTable(allBooks, parent);
	});
}

$('#devare-book').on('click', '.btn-ok', function (e) {
	let $modalDiv = $(e.delegateTarget);
	let id = $(this).data('bookId');
	let url = "http://localhost:3000/books/" + id;

	fetch(url, {
		method: 'DELETE'
	}).then(function (response) {
		if (response.ok) {
			location.reload();
		}
	});

});

$('#devare-book').on('show.bs.modal', function (e) {
	let data = $(e.relatedTarget).data();
	$('.title', this).text(data.recordTitle);
	$('.btn-ok', this).data('bookId', data.bookId);
});

$('#search-form').on('submit', function () {
	findBook();
	return false;
});

$("#select-search").on("change", function () {
	changePlaceholder();
});