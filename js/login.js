

async function signUp(event) {
    event.preventDefault();
    let loginForm = document.getElementById("loginForm");
    let email = loginForm.email.value;
    let password = loginForm.password.value;

    if (email == "") {
        alert("Please enter your email");
        return false;
    }
    if (email.indexOf("@") == -1) {
        alert("Please enter a valid email");
        return false;
    }
    if (password == "") {
        alert("Please enter your password");
        return false;
    }
    if (password.length < 8) {
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
            alert(response.body);
        }

    }


    ).catch(error => console.log("Error " + error));


}




async function signIn(event) {
    event.preventDefault();
    let loginForm = document.getElementById("loginForm");
    let email = loginForm.email.value;
    let password = loginForm.password.value;

    if (email == "") {
        alert("Please enter your email");
        return false;
    }
    if (email.indexOf("@") == -1) {
        alert("Please enter a valid email");
        return false;
    }
    if (password == "") {
        alert("Please enter your password");
        return false;
    }
    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
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
            alert("User logged in successfully");
            window.location.href = "home.html";

        }
        else if (response.status == 400) {
            alert(response.body);
        }

    }


    ).catch(error => console.log("Error " + error));
ogin-password-input

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