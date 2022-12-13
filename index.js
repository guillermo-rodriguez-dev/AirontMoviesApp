const accessTokenLocal = localStorage.getItem("accessToken");
const accessTokenSession = sessionStorage.getItem("accessToken");


if (accessTokenLocal || accessTokenSession) {

    window.location.href = "http://localhost:5500/pages/home.html";
}

else {
    window.location.href = "http://localhost:5500/pages/login.html";
}

