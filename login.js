
// ================= SHOW / HIDE PASSWORD =================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
        togglePassword.setAttribute("aria-label", "Hide password");

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show";
        togglePassword.setAttribute("aria-label", "Show password");

    }

});


// ================= LOGIN FORM =================

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    loginMessage.className = "message";
    loginMessage.textContent = "";


    if (email === "" || password === "") {

        loginMessage.textContent = "Please fill in all fields.";
        loginMessage.classList.add("error");

        return;

    }


    /*
      Frontend demonstration only.

      Real user authentication must be performed
      by the PHP backend using the MySQL database.
    */

    loginMessage.textContent =
        "Login page design is working! Connect the PHP backend to verify your account.";

    loginMessage.classList.add("success");

});
