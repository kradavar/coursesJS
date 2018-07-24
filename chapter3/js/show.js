window.onload = fillInTheTable();

function loadJSON() {
  var url = "http://localhost:3000/books/" + getBookId();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    return JSON.parse(xhr.responseText);
  }
}

function getBookId() {
  return document.location.search.substring(1);
}

function fillInTheTable() {
  var table = document.createElement('table');
  var tableInfo = "<thead><tr><th>Свойство</th><th>Значение</th></tr>" +
    "</thead><tbody><tr><td scope=\"row\">Название</td>" +
    "<td>";

  var currentBook = loadJSON();

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
    var tempIllustr = "Нет";
    if (currentBook.illustration) {
      tempIllustr = "Есть";
    }
    tableInfo += "<td scope=\"row\">Область нуки</td>" +
      "<td> " + currentBook.science + "</td></tr><tr>" +
      "<td scope=\"row\">Иллюстрации</td><td>" + tempIllustr + "</td></tr></tbody>";
  }

  table.innerHTML = tableInfo;
  var parent = document.getElementById('for-table');
  parent.appendChild(table);
  table.className = "table table-bordered table-hover";
}

function goToMainWindow() {
  window.location = "../index.html";
}