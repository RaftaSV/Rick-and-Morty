const getData = async (page) => {
  page = page || 1;
  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
      requestOptions
    );
    console.log("Estado de la respuesta:", response.status);

    if (response.ok) {
      const data = await response.json();
      const container = document.querySelector("main");
      container.innerHTML = "";
      printData(data);
      const nextPageButton = document.getElementById("nextPage");
      const prevPageButton = document.getElementById("prevPage");
      nextPageButton.value = page;
      prevPageButton.value = page;
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
  container.innerHTML = "";

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
    navWrapper.style.backdropFilter = "blur(4px)";
  } else {
    navWrapper.style.backgroundColor = "rgba(174, 235, 240, 1)";
  }
});

const search = async (data) => {};

const nextPage = (e) => {
  const numberPage = parseInt(e.target.value) + 1;
  getData(numberPage);
  const prevPageButton = document.getElementById("prevPage");
  prevPageButton.value = numberPage;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const prevPage = async (e) => {
  const numberPage = parseInt(e.target.value) - 1;
  getData(numberPage);
  const nextPageButton = document.getElementById("nextPage");
  nextPageButton.value = numberPage;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
