import apiConnection from "./apiconnection.js";

const movieDetailsModal = document.getElementById("movie-details-modal");
const closeMovieDetailsModal = document.getElementById("close-button");
const home = document.getElementById("home-container");
const modalMainContainer = document.getElementById("movie-details-modal-container");
const modalMovieModalTitle = document.getElementById("movie-details-title");
const moviePopularity = document.getElementById("movie-popularity");
const similarMoviesContainer = document.getElementById("footer-movie-container");
const movieDetailsDescription = document.getElementById("modal-movie-description");
const movieReleaseDate = document.getElementById("movie-release-date");
const movieLanguaje = document.getElementById("movie-languaje");
const movieGender = document.getElementById("movie-gender");''
const playTrailerButton = document.getElementById("play-trailer-button");
const fillModal = async (movie) => {
    movieDetailsModal.classList.add('overlay-modal');
    movieDetailsModal.classList.remove('hidden-modal');
    home.classList.add('blur');
    closeMovieDetailsModal.addEventListener("click", () => {
        movieDetailsModal.classList.remove('overlay-modal');
        movieDetailsModal.classList.add('hidden-modal');
        home.classList.remove('blur');
    });
    modalMainContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
    modalMovieModalTitle.textContent = movie.title;
    movieDetailsDescription.textContent = movie.overview;
    movieReleaseDate.textContent = movie.release_date;
    movieLanguaje.textContent = movie.original_language;
    movieGender.textContent = movie.genre_ids;
    moviePopularity.textContent = movie.vote_average;
    playTrailerButton.addEventListener("click", () => {
        globalThis.window.open(`https://google.com`, "_blank");
    })
    const similarMovies = await apiConnection.getSimilarMovies(movie.id);
    for (let index = 0; index < 3; index++) {
        const similarMovie = document.createElement("img");
        similarMovie.classList.add("movie-image");
        similarMovie.src = `https://image.tmdb.org/t/p/h632${similarMovies[index].backdrop_path}`;

        similarMoviesContainer.appendChild(similarMovie);
    }
}



export default {fillModal};