import loadJSON from "./json";
import fillInTheTable from "./Table";

// const getTypeOfSearch = () => { return document.getElementById("select-search").value }
function getTypeOfSearch() {
  return document.getElementById("select-search").value
}

function showModalSearch(books) {
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

const searchByTitle = (parameter, books) => {
  let results = [];
  for (let book of books) {
    if (book.title.toLowerCase() === parameter.toLowerCase()) {
      results.push(book);
    }
  }
  return results;
}

const searchByAuthor = (parameter, books) => {
  let results = [];
  for (let book of books) {
    if (book.author.toLowerCase().includes(parameter.toLowerCase())) {
      results.push(book);
    }
  }
  return results;
}

const searchByPublishingHouse = (parameter, books) => {
  let results = [];
  for (let book of books) {
    if (book.publishingHouse.toLowerCase() === parameter.toLowerCase()) {
      results.push(book);
    }
  }
  return results;
}

const searchByYear = (parameter, books) => {
  let results = [];
  for (let book of books) {
    if (book.year == parameter) {
      results.push(book);
    }
  }
  return results;
}

export function changePlaceholder() {
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

export function findBook() {
  loadJSON('http://localhost:3000/books').then(allBooks => {
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