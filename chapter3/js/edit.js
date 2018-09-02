import { loadJSON, putJSON } from "./json";

let bookURL = () => "http://localhost:3000/books/" + document.location.search.substring(1);

window.onload = loadBook();

function loadBook(params) {
  loadJSON(bookURL()).then(function (currentBook) {
    fillInTheForm(currentBook);
  });
}

function fillInTheForm(currentBook) {

  if (currentBook.long != undefined) {
    document.getElementById('choose-type').value = "audio";
    document.getElementById('audio-form').style.display = "block";
    document.getElementById('studybook-form').style.display = "none";
    document.getElementById('long').value = currentBook.long;
    document.getElementById('reader').value = currentBook.reader;
  }

  if (currentBook.science != undefined) {
    document.getElementById('choose-type').value = "studybook";
    document.getElementById('audio-form').style.display = "none";
    document.getElementById('studybook-form').style.display = "block";
    document.getElementById('science').value = currentBook.science;
    document.getElementById('illustration').checked = currentBook.illustration;

  }
  document.getElementById('title').value = currentBook.title;
  document.getElementById('author').value = currentBook.author;
  document.getElementById('publishing-house').value = currentBook.publishingHouse;
  document.getElementById('year').value = currentBook.year;
  document.getElementById('audience').value = currentBook.audience;
  document.getElementById('description').value = currentBook.description;
}

function updateBook() {
  let book = {};
  let bookType = document.getElementById('choose-type');

  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  book.publishingHouse = document.getElementById('publishing-house').value;
  book.year = document.getElementById('year').value;
  book.audience = document.getElementById('audience').value;
  book.description = document.getElementById('description').value;
  switch (bookType.value) {
    case 'audio':
      book.long = document.getElementById('long').value;
      book.reader = document.getElementById('reader').value;
      break;
    case 'studybook':
      book.science = document.getElementById('science').value;
      book.illustration = document.getElementById('illustration').checked;
      break;
    default:
      return alert("Выберите тип книги!");
  }

  putJSON(bookURL(), book);
}