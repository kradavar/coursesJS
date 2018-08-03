let bookID = () => document.location.search.substring(1);

function loadJSON() {

  let url = "http://localhost:3000/books/" + bookID();
  fetch(url).then(function(response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function(currentBook) {
    fillInTheTable(currentBook);
  });
}

window.onload = loadJSON();

function fillInTheTable(currentBook) {
  let table = document.createElement('table');
  let tableInfo = "<thead><tr><th>Свойство</th><th>Значение</th></tr>" +
    "</thead><tbody><tr><td scope=\"row\">Название</td>" +
    "<td>";

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

  // TODO: rename long
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
      "<td scope=\"row\">Иллюстрации</td><td>" + tempIllustr + "</td></tr></tbody>";
  }

  table.innerHTML = tableInfo;
  let parent = document.getElementById('for-table');
  parent.appendChild(table);
  table.className = "table table-bordered table-hover";
}

function goToMainWindow() {
  window.location = "../index.html";
}