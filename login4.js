// login4.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase config (REPLACE WITH YOUR CREDENTIALS!)
const firebaseConfig = {
    apiKey: "AIzaSyCja44FWjO6UDztL4qYO2GU_HnY7bEn2WE",
    authDomain: "mini-project-91f7a.firebaseapp.com",
    projectId: "mini-project-91f7a",
    storageBucket: "mini-project-91f7a.appspot.com",
    messagingSenderId: "345159644542",
    appId: "1:345159644542:web:ffafe47b1d0932e8002f2f"
  };
// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// On DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // Login
    const loginForm = document.getElementById("login-form");
    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('userUid', user.uid); // Store the uid
                console.log("Login user UID: ", user.uid); // Debug
                alert("Login successful!");
                window.location.href = "home18.html"; // Redirect to home page

            })
            .catch((error) => {
                alert("Login failed: " + error.message);
            });
    });

    // Show/Hide sign-up form
    const toggleBtn = document.getElementById("toggle-signup");
    const signupForm = document.getElementById("signup-form");
    toggleBtn?.addEventListener("click", () => {
        signupForm.classList.toggle("hidden");
    });

    // Sign up
    signupForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('userUid', user.uid); // Store the uid
                console.log("Signup user UID: ", user.uid); // Debug
                alert("Account created successfully!");
                window.location.href = "name.html"; // Redirect to home page
            })
            .catch((error) => {
                alert("Account creation failed: " + error.message);
            });
    });
});