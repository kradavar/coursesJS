function start() {
  let button = document.getElementById('color-btn');
  let secondBtn = document.getElementById('onecolor-btn');
  let mixinBtn = document.getElementById('mixin');
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
    secondBtn.style.display = "block";
    mixinBtn.style.display = "block";
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

function makeIterator(rows) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < rows.length ? { value: nextIndex++, done: false } : { done: true };
    }
  }
}

function changeRowsColors() {
  let table = document.getElementById('my-table');
  const rows = table.rows;
  let iterator = makeIterator(rows);
  for (let row of rows) {
    let index = iterator.next();
    setTimeout(function() {
      row.style.backgroundColor = "red";
    }, index.value * 1000);
  }
}

function changeOneRowColor() {
  let table = document.getElementById('my-table');
  const rows = table.rows;
  let iterator = makeIterator(rows);
  const rowToChange = +prompt("Укажите номер строки (от 1 до " + (rows.length - 1) + "), цвет которой вы хотите изменить");
  for (let row of rows) {
    let index = iterator.next();
    if (index.value == rowToChange) {
      row.style.backgroundColor = "green";
    }
  }
}

class TopCloth {
  constructor() {
    this.material = "хлопок";
  }
  topMethod() {
    console.log("Это верхняя часть одежды.");
  }
}

let MixinBottom = superclass => class extends superclass {
  constructor() {
    super();
    this.length = "макси";
  }

  bottomMethod() {
    console.log("Это нижняя часть одежды");
  }
}

class Overalls extends MixinBottom(TopCloth) {
  overallsMethod() {
    console.log("Это комбинезон!:)");
  }
}

function showMixin() {
  alert("Результат выполнения в консоли:)");
  let overall = new Overalls();
  overall.overallsMethod();
  overall.bottomMethod();
  overall.topMethod();

  console.log(overall.material);
  console.log(overall.length);
}