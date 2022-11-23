
const multiCardIcon = document.getElementById("multi-card-switch");

const oneCardIcon = document.getElementById("one-card-switch");

const moviesCard = document.getElementsByClassName("movie");


oneCardIcon.addEventListener("click", function () {
    if (!oneCardIcon.classList.contains("switch-selected")) {
        oneCardIcon.classList.add("switch-selected");
        multiCardIcon.classList.remove("switch-selected");
        for (let i = 0; i < moviesCard.length; i++) {
            moviesCard[i].classList.add("movie-full-size");
        }
    }
})

multiCardIcon.addEventListener("click", function () {
    if (!multiCardIcon.classList.contains("switch-selected")) {
        multiCardIcon.classList.add("switch-selected");
        oneCardIcon.classList.remove("switch-selected");
        for (let i = 0; i < moviesCard.length; i++) {
            moviesCard[i].classList.remove("movie-full-size");
        }
    }
})

