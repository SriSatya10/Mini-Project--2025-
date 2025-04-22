import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

        document.addEventListener('DOMContentLoaded', () => {
            const currentUserUid = localStorage.getItem('userUid');
            console.log("Current user UID (name.html): ", currentUserUid);

            if (!currentUserUid) {
                alert("User not logged in");
                window.location.href = "login4.html";
                return;
            }

            function getChatHistory(uid) {
                const key = "therabot_chat_history_" + uid;
                const storedHistory = localStorage.getItem(key);
                if (storedHistory) {
                    return JSON.parse(storedHistory);
                } else {
                    return [];
                }
            }

            function setChatHistory(uid, chatHistory) {
                const key = "therabot_chat_history_" + uid;
                localStorage.setItem(key, JSON.stringify(chatHistory));
            }

            let chat = getChatHistory(currentUserUid);

            function displayChat() {
                const chatDisplay = document.getElementById("chat-display");
                chatDisplay.innerHTML = "";
                chat.forEach((message) => {
                    const messageElement = document.createElement("p");
                    messageElement.textContent = message;
                    chatDisplay.appendChild(messageElement);
                });
            }

            displayChat();

            function sendMessage(message) {
                chat.push(message);
                setChatHistory(currentUserUid, chat);
                displayChat();
            }

            document.getElementById("send-button").addEventListener("click", () => {
                const messageInput = document.getElementById("message-input");
                const message = messageInput.value;
                if (message) {
                    sendMessage(message);
                    messageInput.value = "";
                }
            });

            // Test Storage Function.
            function testStorage(uid, message) {
                const key = "test_chat_" + uid;
                localStorage.setItem(key, message);
                console.log("Stored:", localStorage.getItem(key));
            }
            testStorage(currentUserUid, "Test message for: " + currentUserUid);
        });
    