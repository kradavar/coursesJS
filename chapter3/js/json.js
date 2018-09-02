export default function loadJSON(url) {
  return fetch(url).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      alert("Ошибка" + response.status);
    }
  });
}