const apiKey = "";
const apiBaseUrl = "https://api.themoviedb.org/3";
const movieContainer = document.getElementById("most-watched-movies-container");


const getMoviesFromApi = async () => {
    const response = await fetch(`${apiBaseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const movies = data.results;
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
        movieContainer.appendChild(movie)
    }
  
}






addMostWatchesMovies();


{/* <div class="movie">

    <h3 class="most-watched-movie-title">Godzilla vs Kong</h3>
    <div class="rating-container">
        <i class="fa fa-star rating-start--small" alt="rating start"></i>
        <i class="fa fa-star rating-start--small" alt="rating start"></i>
        <i class="fa fa-star rating-start--small" alt="rating start"></i>
        <i class="fa fa-star rating-start--small" alt="rating start"></i>
        <i class="fa fa-star rating-start--small" alt="rating start"></i>
    </div>
    <p class="most-watched-movie-description">Five years after Godzilla defeated King Ghidorah, Kong is
        monitored by Monarch within a giant dome on
        Skull Island.
    </p>
</div> */}
