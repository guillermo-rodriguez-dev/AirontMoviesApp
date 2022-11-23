const apiKey = "51a36c9caed1e09d8398a600b96856cc";
const apiBaseUrl = "https://api.themoviedb.org/3";
const movieContainer = document.getElementById("most-watched-movies-container");
const movieDetailsModal = document.getElementById("movie-details-modal");
const home = document.getElementById("home-container");
const closeMovieDetailsModal = document.getElementById("close-button");
const modalMainContainer = document.getElementById("movie-details-modal-container");
const modalMovieTitle = document.getElementById("movie-details-title");
const movieDetailsDescription = document.getElementById("modal-movie-description");
const movieReleaseDate = document.getElementById("movie-release-date");
const movieLanguaje = document.getElementById("movie-languaje");
const movieGender = document.getElementById("movie-gender");
const moviePopularity = document.getElementById("movie-popularity");
const similarMoviesContainer = document.getElementById("footer-movie-container");
const getMoviesFromApi = async () => {
    let response = await fetch(`${apiBaseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    let data = await response.json();
    let movies = data.results;
    return movies;
}

const getSimilarMovies = async (movieId) => {
    let response = await fetch(`${apiBaseUrl}/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`);
    let data = await response.json();
    let movies = data.results;
    return movies;
}



const addMostWatchesMovies = async () => {
    const movies = await getMoviesFromApi();
    for (let index = 0; index < 3; index++) {
        const movie = document.createElement("div");
        movie.classList.add("movie");
        movie.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movies[index].poster_path})`;
        const movieTitle = document.createElement("h3");
        movieTitle.classList.add("most-watched-movie-title");
        movieTitle.textContent = movies[index].title;
        movie.appendChild(movieTitle);
        const ratingContainer = document.createElement("div");
        ratingContainer.classList.add("rating-container");
        const ratingStar = document.createElement("i");
        ratingStar.classList.add("fa", "fa-star", "rating-start--small");
        ratingContainer.appendChild(ratingStar);
        movie.appendChild(ratingContainer);
        const movieDescription = document.createElement("p");
        movieDescription.classList.add("most-watched-movie-description");
        movieDescription.textContent = movies[index].overview;
        movie.appendChild(movieDescription);
        movie.addEventListener("click", async ()  => {
            movieDetailsModal.classList.add('overlay-modal');
            movieDetailsModal.classList.remove('hidden-modal');
            home.classList.add('blur');
            closeMovieDetailsModal.addEventListener("click", () => {
                movieDetailsModal.classList.remove('overlay-modal');
                movieDetailsModal.classList.add('hidden-modal');
                home.classList.remove('blur');
            });
            modalMainContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movies[index].backdrop_path})`;
            modalMovieTitle.textContent = movies[index].title;
            movieDetailsDescription.textContent = movies[index].overview;
            movieReleaseDate.textContent = movies[index].release_date;
            movieLanguaje.textContent = movies[index].original_language;
            movieGender.textContent = movies[index].genre_ids;
            moviePopularity.textContent = movies[index].vote_average;
            const similarMovies = await getSimilarMovies(movies[index].id);
            for (let index = 0; index < 3; index++) {
                const similarMovie = document.createElement("img");
                similarMovie.classList.add("movie-image");
                similarMovie.src = `https://image.tmdb.org/t/p/w500${similarMovies[index].backdrop_path}`;
                similarMoviesContainer.appendChild(similarMovie);
            }

        });
        movieContainer.appendChild(movie)
    }

}






addMostWatchesMovies();

]