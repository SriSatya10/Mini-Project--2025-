// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCja44FWjO6UDztL4qYO2GU_HnY7bEn2WE",
  authDomain: "mini-project-91f7a.firebaseapp.com",
  projectId: "mini-project-91f7a",
  storageBucket: "mini-project-91f7a.appspot.com", // Fixed .app -> .com
  messagingSenderId: "345159644542",
  appId: "1:345159644542:web:ffafe47b1d0932e8002f2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  if (!form) {
    console.error("Login form not found");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful!");
        console.log("Logged in user:", userCredential.user);
        window.location.href = "name.html"; // redirect after login
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
      });
  });
});
