

const emailRegex = /.*@.*[.].*/;
const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/);
const emailInputContainer = document.getElementById("login-email-input");
const passwordInputContainer = document.getElementById("password-container");


const auth = {
    logOut: () => {
        document.cookie = ``;
        window.location.href = "login.html";
    },

    //function to login user
    signIn: async (event) => {
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
                document.cookie = `accesToken=${response.accesToken}`;
                window.location.href = "home.html";
            }
            else if (response.status == 400) {
                loginError.innerHTML = "Invalid email or password";
            }
        }
        ).catch(error => { console.log("Error " + error) }, loginError.innerHTML = "Error Connecting with Server");
    }
    ,


    signUp: async (event) => {
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


}

export default auth;