
import constants from "./constants.js";

const getMoviesFromApi = async (page = 1) => {
    let response = await fetch(`${constants.apiBaseUrl}/movie/popular?api_key=${constants.apiKey}&language=en-US&page=${page}`);
    let data = await response.json();
    return data;
}

const getSimilarMovies = async (movieId) => {
    let response = await fetch(`${constants.apiBaseUrl}/movie/${movieId}/similar?api_key=${constants.apiKey}&language=en-US&page=1`);
    let data = await response.json();
    let movies = data.results;
    return movies;
}



export default { getSimilarMovies, getMoviesFromApi };