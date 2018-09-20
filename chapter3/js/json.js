export default function loadJSON(url) {
  return fetch(url).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert("Ошибка" + response.status);
    }
  });
}

export function sendJSON(method, url, book) {
  fetch(url, {
    method,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(book)
  }).then(function (response) {
    console.log(response)
    if (response.ok) {
      window.location = "../index.html";
    }
  });
}