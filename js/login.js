import auth from "./auth.js";



const hideRevelPassword = document.getElementById("hide-revel-password");
const passwordInput = document.getElementById("login-password-input");
const loginButton = document.getElementById("submit-login-buttom");
const loginForm = document.getElementById("loginForm");

hideRevelPassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        console.log("password revel");
    }
    else {
        passwordInput.type = "password";
        console.log("password");
    }
});

const signIn = async (event) => {
    auth.signIn(event);
}