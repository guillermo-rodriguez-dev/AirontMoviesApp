import constants from "./constants.js";
const searchbarInput = document.getElementById('searchbar-input');
const searchIconButton = document.getElementById('searchbar-icon');
const searchResultContainer = document.getElementById("search-result")
const searchMovieByTitle = async (title) => {
    const response = await fetch(`${constants.apiBaseUrl}/search/movie?api_key=${constants.apiKey}&language=en-US&query=${title}&page=1&include_adult=false`);
    const data = await response.json();
    const movies = data.results;
    return movies;
}

searchIconButton.addEventListener('click', async (event) => {
    const movies = await searchMovieByTitle(searchbarInput.value);
    console.log(movies);
});

searchbarInput.addEventListener('keydown', async (event) => {
    searchResultContainer.innerHTML = "";
    if (searchbarInput.value.length > 2) {
        let movies = await searchMovieByTitle(searchbarInput.value);
        movies = movies.slice(0, 5);
        movies.forEach(element => {
            const movieResult = document.createElement("li");
            const movieImage = document.createElement("img");
            movieImage.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            movieResult.appendChild(movieImage);
            movieResult.innerHTML += element.title;
            searchResultContainer.appendChild(movieResult);
        });

    } else {
        searchResultContainer.innerHTML = "";
    }
});
