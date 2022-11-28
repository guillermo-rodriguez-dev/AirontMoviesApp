
const emailRegex = /.*@.*[.].*/;
const passwordRegex = /.{8}.*/;
const emailInputContainer = document.getElementById("login-email-input");
const passwordInputContainer = document.getElementById("password-container");
//function to register user
async function signUp(event) {
    event.preventDefault();
    let loginForm = document.getElementById("loginForm");
    let email = loginForm.email.value;
    let password = loginForm.password.value;

    if (email == "") {
        alert("Please enter your email");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email");
        return false;
    }
    if (password == "") {
        alert("Please enter your password");
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters");
        return false;
    }

    await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(response => {
        if (response.status == 201) {
            alert("User created successfully");
            window.location.href = "login.html";

        }
        else if (response.status == 400) {
            alert("There was an Error Creating User");
        }

    }


    ).catch(error => console.log("Error " + error));


}



//function to login user
async function signIn(event) {
    event.preventDefault();
    let loginForm = document.getElementById("loginForm");
    let email = loginForm.email.value;
    let password = loginForm.password.value;
    let loginError = document.getElementById("error-message-general");
    let emailError = document.getElementById("error-message-email");
    let passwordError = document.getElementById("error-message-general");

    if (email == "") {
        emailError.innerHTML = "Please enter your email";
        emailInputContainer.classList.add("input-error-state");
        return false;
    }
    else if (!emailRegex.test(email)) {
        emailInputContainer.classList.add("input-error-state");
        emailError.innerHTML = "Please enter a valid email";

        return false;
    } else {
        emailInputContainer.classList.remove("input-error-state");
        emailError.innerHTML = "";
    }
    if (password == "") {
        passwordInputContainer.classList.add("input-error-state");
        passwordError.innerHTML = "Please enter your password";

        return false;
    }
    else if (!passwordRegex.test(password)) {
        passwordInputContainer.classList.add("input-error-state");
        passwordError.innerHTML = "Password must be at least 8 characters";
        return false;
    }
    else {
        passwordInputContainer.classList.remove("input-error-state");
        passwordError.innerHTML = "";
    }

    await fetch("http://localhost:3000/login", {
        method: "post",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(response => {
        if (response.status == 200) {

            window.location.href = "home.html";

        }
        else if (response.status == 400) {
            loginError.innerHTML = "Invalid email or password";

        }

    }


    ).catch(error => console.log("Error " + error));


}


const passwordInput = document.getElementById("login-password-input");

const hideRevelPassword = document.getElementById("hide-revel-password");


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