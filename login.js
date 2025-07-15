import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
    getAuth,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

import { getFirestore} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyDt359BEU-aq_SjWSniNIbsQyDPa2lxhuU",
    authDomain: "signup-my-application.firebaseapp.com",
    databaseURL:
        "https://signup-my-application-default-rtdb.firebaseio.com",
    projectId: "signup-my-application",
    storageBucket: "signup-my-application.firebasestorage.app",
    messagingSenderId: "942108452259",
    appId: "1:942108452259:web:856275450cd7430ad6a616",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
export { storage };
const db = getFirestore(app);

export { db };

const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const registerBtn = document.getElementById("register-button");
const logEmail = document.getElementById("logEmail");
const logPassword = document.getElementById("logPassword");
const loginBtn = document.getElementById("login-button");
const reset = document.getElementById("reset-password");
const regUsername = document.getElementById("regUsername");

function isValidPassword(password) {
    return password.length >= 6;
}

// Registration
if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = regEmail.value.trim();
        const password = regPassword.value;

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        if (!isValidPassword(password)) {
            alert("Password must be at least 6 characters long");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: regUsername.value.trim()}).catch((error) => {
                    console.error("Failed to set username:", error);
                });

                updateProfile(user, { displayName: regUsername.value.trim() })
console.log("Username set to:", regUsername.value.trim());

                sendEmailVerification(user)
                    .then(() => {
                        alert(
                            "Registration successful! Please check your email to verify your account before logging in."
                        );
                        regEmail.value = "";
                        regPassword.value = "";
                    })
                    .catch((error) => {
                        alert(
                            "Registration successful, but failed to send verification email."
                        );
                        console.error("Verification email error:", error);
                    });
            })
            .catch((error) => {
                let errorMessage = "Registration failed. Please try again.";
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "An account with this email already exists.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email address format.";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password is too weak.";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "No user found with this email address.";
                        break;
                    default:
                        errorMessage = error.message;
                }
                alert("Error: " + errorMessage);
                console.error(
                    "Error during registration:",
                    error.code,
                    error.message
                );
            });
    });
}



// Login
if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!logEmail || !logPassword) {
            alert(
                "Login form is not properly loaded. Please refresh the page."
            );
            return;
        }
        const email = logEmail.value.trim();
        const password = logPassword.value;

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (!user.emailVerified) {
                    alert(
                        "Please verify your email before logging in. Check your inbox for the verification link."
                    );
                    signOut(auth);
                    return;
                }
                alert("Login successful!");
                logEmail.value = "";
                logPassword.value = "";
                window.location.href = "order.html";
            })
            .catch((error) => {
                let errorMessage = "Login failed. Please try again.";
                switch (error.code) {
                    case "auth/invalid-credential":
                        errorMessage =
                            "Invalid email or password. Please check your credentials.";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "No account found with this email address.";
                        break;
                    case "auth/wrong-password":
                        errorMessage = "Incorrect password.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email address format.";
                        break;
                    case "auth/user-disabled":
                        errorMessage = "This account has been disabled.";
                        break;
                    case "auth/too-many-requests":
                        errorMessage =
                            "Too many failed attempts. Please try again later.";
                        break;
                    default:
                        errorMessage = error.message;
                }
                alert("Error: " + errorMessage);
                console.error("Error during login:", error.code, error.message);
            });
    });
}

//Password Reset
if (reset) {
    reset.addEventListener("click", (e) => {
        e.preventDefault();
        const email = logEmail.value.trim();
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent! Please check your inbox.");
                logEmail.value = "";
            })
            .catch((error) => {
                let errorMessage =
                    "Failed to send password reset email. Please try again.";
                switch (error.code) {
                    case "auth/user-not-found":
                        errorMessage = "No account found with this email address.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid email address format.";
                        break;
                    default:
                        errorMessage = error.message;
                }
                alert("Error: " + errorMessage);
                console.error(
                    "Error during password reset:",
                    error.code,
                    error.message
                );
            });
    });
}

export {updateProfile}
