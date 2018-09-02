export default function fillInTheTable(books, parent) {
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
