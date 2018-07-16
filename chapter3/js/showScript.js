let allBooks = [];
let table = document.createElement('table');
let tableInfo = "<thead><tr><th>Свойство</th><th>Значение</th></tr>" +
  "</thead><tbody><tr><td scope=\"row\">Название</td>" +
  "<td>";
window.onload = fillInTheTable();

function loadJSON() {

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books', false);

  xhr.send();
  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    let textForParser = xhr.responseText;
    return JSON.parse(textForParser);
  }
}

function getArgument() {
  let id = document.location.search.substring(1);
  return id;
}

function fillInTheTable() {

  allBooks = loadJSON();

  let index = getArgument();

  let currentBook = allBooks[index];

  for (let i = 0; i < allBooks.length; i++) {
    if (index == allBooks[i].id) {
      currentBook = allBooks[i];
    }
  }

  tableInfo += " " + currentBook.title + "</td>" +
    "</tr><tr><td scope=\"row\">Автор</td>" +
    "<td> " + currentBook.author + "</td></tr>" +
    "<tr><td scope=\"row\">Издательство</td>" +
    "<td> " + currentBook.publishingHouse + "</td>" +
    "</tr><tr><td scope=\"row\">Год издания" +
    "</td><td> " + currentBook.year + "</td></tr>" +
    "<tr><td scope=\"row\">Краткое описание</td>" +
    "<td> " + currentBook.description + "</td></tr>" +
    "<tr><td scope=\"row\">Возраст аудитории</td>" +
    "<td> " + currentBook.audience + "</td></tr><tr>";

  if (currentBook.long != undefined) {
    tableInfo += "<td scope=\"row\">Диктор</td>" +
      "<td> " + currentBook.reader + "</td></tr><tr>" +
      "<td scope=\"row\">Длительность</td><td>" + currentBook.long + "</td></tr>";
  }

  if (currentBook.science != undefined) {
    let tempIllustr = "Нет";
    if (currentBook.illustration) {
      tempIllustr = "Есть";
    }
    tableInfo += "<td scope=\"row\">Область нуки</td>" +
      "<td> " + currentBook.science + "</td></tr><tr>" +
      "<td scope=\"row\">Иллюстрации</td><td>" + tempIllustr + "</td></tr>";
  }

  tableInfo += "</tbody>";
  table.innerHTML = tableInfo;
  let parent = document.getElementById('for-table');
  parent.appendChild(table);
  table.className = "table table-bordered table-hover";


}