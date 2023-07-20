const movieWrapper = document.querySelector(".movies");
const searchResults = document.querySelector(".search__results");
const loading = document.querySelector(".loading");
let userInput = "";

async function main(filter) {
  setTimeout(() => {
    loading.classList += " movies__loading";
  }, 400);

  movieWrapper.style.visibility = "hidden";

  const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=24e4873b&s=${userInput}`);
  const movieData = await movies.json();
  const moviesToDisplay = movieData.search;

  if (!movieData.Search || movieData.Search.length === 0) {
    movieWrapper.innerHTML = "";
    searchResults.innerHTML = "Search Results For: " + `"${userInput}"`;
  } else {
    const moviesToDisplay = movieData.Search;
    searchResults.innerHTML = "Search Results For: " + `"${userInput}"`;

    setTimeout(() => {
      movieWrapper.style.visibility = "visible";
      movieWrapper.innerHTML = moviesToDisplay.map((movie) => movieHTML(movie)).join("");
      loading.classList.remove("movies__loading");
    }, 1200);

    if (filter === "OLD_TO_NEW") {
      moviesToDisplay.sort((a, b) => a.Year - b.Year);
    } else if (filter === "NEW_TO_OLD") {
      moviesToDisplay.sort((a, b) => b.Year - a.Year);
    }
  }
  loading.classList.remove("movies__loading");
}

function movieHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--container">
      <img class="movie__img" src="${movie.Poster}" alt=""/>
    </figure>
    <div class="movie__title">${movie.Title}</div>
    <div class="movie__year">${movie.Year}</div>
  </div>`;
}

function filterMovies(event) {
  main(event.target.value);
}

function search(event) {
  userInput = event.target.value;
  main();
}
