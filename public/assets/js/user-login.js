const changeMethod = document.querySelector(".switch-p");
const signInBtn = document.getElementById("sign-in-btn");
const signUpBtn = document.getElementById("sign-up-btn");
const signInForm = document.getElementById("login");
const signUpForm = document.getElementById("sign-up");

document.getElementById("username-sign-up-input").addEventListener("blur", () => {
    const usernameInput = document.getElementById("username-sign-up-input");
    const usernameWarning = document.getElementById("username-warning-p");

    if (usernameInput.value && !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,}$/.test(usernameInput.value)) {
        usernameWarning.classList.remove("none");
        usernameWarning.classList.add("username-warning-p")
    } else {
        usernameWarning.classList.add("none");
    }
});
document.getElementById("password-sign-up-input").addEventListener("blur", () => {
    const passwordInput = document.getElementById("password-sign-up-input");
    const passwordWarning = document.getElementById("password-warning-p");

    if (passwordInput.value && !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,}$/.test(passwordInput.value)) {
        passwordWarning.classList.remove("none");
        passwordWarning.classList.add("username-warning-p")
    } else {
        passwordWarning.classList.add("none");
    }
});



let signUpPage = false;

changeMethod.addEventListener("click", () => {
    const divToAppear = document.getElementById(signUpPage ? "login" : "sign-up");
    const divToDisappear = document.getElementById(signUpPage ? "sign-up" : "login");

    changeMethod.textContent = signUpPage ? "Don't have an account? Sign up!" : "Do you wish to sign in now?";

    divToAppear.style.display = "flex";
    divToDisappear.style.display = "none";

    signUpPage = !signUpPage;
});

// Logging in into account
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    username = document.getElementById("username-login-input").value;
    password = document.getElementById("password-login-input").value;

    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
        // Save current user in local storage
        localStorage.setItem("user", username);
        window.location.replace('/home');
    } else
        alert(result.message);
});

// Create user
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let username, password;

    username = document.getElementById("username-sign-up-input").value;
    password = document.getElementById("password-sign-up-input").value;

    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,}$/;

    if (!passwordRegex.test(password) && !usernameRegex.test(username)) {
        alert("Please fill out the inputs properly.");
        return;
    }

    if (!usernameRegex.test(username)) {
        alert("Please fill out the username input properly.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Please fill out the password input properly.");
        return;
    }

    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
        window.location.replace('/home');
        localStorage.setItem("user", username);
    } else {
        alert(result.message);
    }
});
