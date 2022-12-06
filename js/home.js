import apiConnection from "./apiconnection.js";
import modal from "./modal.js";
import auth from "./auth.js";

const multiCardIcon = document.getElementById("multi-card-switch");

const oneCardIcon = document.getElementById("one-card-switch");

const moviesCard = document.getElementsByClassName("movie");

const movieContainer = document.getElementById("most-watched-movies-container");

const logOutIcon = document.getElementById("log-out-buttom");

let mostWatchedMoviesPage = 1;

let totalPages;

//this save switch state
let oneCard = false;

oneCardIcon.addEventListener("click", function () {
    oneCard = true;
    if (!oneCardIcon.classList.contains("switch-selected")) {
        oneCardIcon.classList.add("switch-selected");
        multiCardIcon.classList.remove("switch-selected");
        for (let i = 0; i < moviesCard.length; i++) {
            moviesCard[i].classList.add("movie-full-size");
        }
    }
})

multiCardIcon.addEventListener("click", function () {
    oneCard = false;
    if (!multiCardIcon.classList.contains("switch-selected")) {
        multiCardIcon.classList.add("switch-selected");
        oneCardIcon.classList.remove("switch-selected");
        for (let i = 0; i < moviesCard.length; i++) {
            moviesCard[i].classList.remove("movie-full-size");
        }
    }
})
const fillMainMovie = (movie) => {
    const mainContainer = document.getElementById("main-container");
    const genderLabel = document.getElementById("gender")
    const mainDescription = document.getElementById("main-description-text");
    const movieTitle = document.getElementById("movie-title");
    const ratingContainer = document.getElementById("rating-container");
    const watchButton = document.getElementById("watch-now-button");
    mainContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
    genderLabel.innerHTML = movie.title;
    mainDescription.innerHTML = movie.overview;
    movieTitle.textContent = movie.title;
    watchButton.addEventListener("click", () => {
        globalThis.window.open(`https://google.com`, "_blank");
    });
    const ratingStars = Math.round(movie.vote_average / 2);
    for (let start = 0; start < ratingStars; start++) {
        const star = document.createElement("i");
        star.classList.add("fas", "fa-star");
        ratingContainer.appendChild(star);
    }

}



const addMostWatchedMovies = (movies) => {
    for (let index = 1; index < movies.length; index++) {
        setTimeout(() => {
            const movie = document.createElement("div");
            movie.classList.add("loader");
            setTimeout(() => {
                movie.classList.remove("loader");
                movie.classList.add("movie");
                movie.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${movies[index].poster_path})`;
                const movieModalTitle = document.createElement("h3");
                movieModalTitle.classList.add("most-watched-movie-title");
                if (oneCard) {
                    movie.classList.add("movie-full-size");
                }
                movieModalTitle.textContent = movies[index].title;
                movie.appendChild(movieModalTitle);
                const ratingContainer = document.createElement("div");
                ratingContainer.classList.add("rating-container");
                const ratingStars = Math.round(movies[index].vote_average / 2);
                for (let start = 0; start < ratingStars; start++) {
                    const ratingStar = document.createElement("i");
                    ratingStar.classList.add("fa", "fa-star", "rating-start--small");
                    ratingContainer.appendChild(ratingStar);
                }
                movie.appendChild(ratingContainer);
                const movieDescription = document.createElement("p");
                movieDescription.classList.add("most-watched-movie-description");
                movieDescription.textContent = movies[index].overview;
                movie.appendChild(movieDescription);
            }, 150 * index)

            movie.addEventListener("click", async () => {
                modal.fillModal(movies[index]);
            });
            movieContainer.appendChild(movie)
        }, 100 * index);

    }
}
const chargeHomePage = async () => {
    const movies = await apiConnection.getMoviesFromApi();
    totalPages = movies.total_pages;
    const mostWatchedMovie = movies.results[0];
    fillMainMovie(mostWatchedMovie);
    addMostWatchedMovies(movies.results);
}

const chargeSearchResult = async (movies) => {
    const mostWatchedMovie = movies[0];
    fillMainMovie(mostWatchedMovie);
    addMostWatchedMovies(movies);
}

document.addEventListener("scroll", () => {
    if (globalThis.window.scrollY + globalThis.window.innerHeight >=
        document.documentElement.scrollHeight && mostWatchedMoviesPage < totalPages) {
        mostWatchedMoviesPage++;
        apiConnection.getMoviesFromApi(mostWatchedMoviesPage).then((movies) => {
            totalPages = movies.total_pages;
            addMostWatchedMovies(movies.results);
        }).catch((error) => {
            console.log(error);
        });
    }
})
logOutIcon.addEventListener("click", () => {
    auth.logOut();
});



chargeHomePage();



export default { chargeSearchResult };