const getData = async () => {
  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character",
      requestOptions
    );
    console.log("Estado de la respuesta:", response.status);

    if (response.ok) {
      const data = await response.json();
      printData(data);
      search(data);
    } else {
      console.error("Error al obtener los datos:", response.statusText);
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

const printData = async (data) => {
  const container = document.querySelector("main");

  data.results.forEach((character) => {
    const article = document.createRange().createContextualFragment(`
      <article class="cardWrapper">
        <img src="${character.image}" alt="${character.name}" id="image" />
        <h2><strong>Name:</strong> ${character.name}</h2>
        <p><strong>Specie:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Status:</strong> ${character.status}</p>
      </article>`);
    container.append(article);
  });
};

getData();

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const navWrapper = document.getElementById("nav");

  if (scrollPosition > 0) {
    navWrapper.style.backgroundColor = "rgba(174, 235, 240, 0.6)";
  } else {
    navWrapper.style.backgroundColor = "rgba(174, 235, 240, 1)";
  }
});

const search = async (data) => {};
