import constants from "./constants.js";
const searchbarInput = document.getElementById('searchbar-input');
const searchIconButton = document.getElementById('searchbar-icon');

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


searchbarInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
        const movies = await searchMovieByTitle(searchbarInput.value);
        console.log(movies);
    }



});

searchbarInput.addEventListener('keypress', async (event) => {
   
        const movies = await searchMovieByTitle(searchbarInput.value);
        console.log(movies);
    



});