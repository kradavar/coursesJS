function start() {
  let button = document.getElementById('color-btn');
  let indexGen = generate();
  let table = document.createElement('table');
  let tableInfo = "<thead><tr><th>#</th>" +
    "<th>Название</th></tr></thead><tbody>";
  let parent = document.getElementById('for-table');
  let numberOfRows = +prompt("Введите количество строк таблицы ( < 10), которое вы хотите сгенерировать.");
  if (numberOfRows < 11) {
    for (let i = 0; i < numberOfRows; i++) {
      tableInfo += indexGen.next(numberOfRows).value;
    }
    tableInfo += "</tbody>";
    table.innerHTML = tableInfo;
    table.className = "table table-bordered table-hover";
    table.setAttribute("id", "my-table");
    parent.appendChild(table);
    button.style.display = "block";
  } else {
    alert("Количество строк должно быть меньше 10");
    location.reload();
  }
}

function* generate(numberOfRows) {
  let tableIndex = 1;
  for (; tableIndex < 11; tableIndex++) {
    yield "<tr><td>" + tableIndex + "</td><td>Сгенерированная строка номер " + tableIndex + "</td></tr>";
  }
}

function changeRowsColors() {
  let table = document.getElementById('my-table');
  let rows = table.rows;
  console.log(rows);
}