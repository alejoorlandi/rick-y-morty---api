const BASE_URL = "https://rickandmortyapi.com/api/character/";
const resultsDiv = document.getElementById("results");
const errorDiv = document.getElementById("error");

document.getElementById("getAll").addEventListener("click", () => {
  fetchCharacters(BASE_URL);
});

document.getElementById("filterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;
  const species = document.getElementById("species").value;
  const type = document.getElementById("type").value;
  const gender = document.getElementById("gender").value;

  const query = new URLSearchParams({ name, status, species, type, gender });
  fetchCharacters(`${BASE_URL}?${query}`);
});

function fetchCharacters(url) {
  resultsDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se encontraron personajes con esos filtros.");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        throw new Error("No se encontraron personajes.");
      }
      data.results.forEach((char) => {
        const div = document.createElement("div");
        div.className = "character";
        div.innerHTML = `
          <h3>${char.name}</h3>
          <img src="${char.image}" alt="${char.name}" />
          <p><strong>Status:</strong> ${char.status}</p>
          <p><strong>Species:</strong> ${char.species}</p>
          <p><strong>Gender:</strong> ${char.gender}</p>
        `;
        resultsDiv.appendChild(div);
      });
    })
    .catch((err) => {
      errorDiv.innerText = err.message;
    });
}
