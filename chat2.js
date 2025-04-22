const questionCategories = {
    "SAD (Social Anxiety Disorder)": [
        "Do you often feel uneasy, tense, or anxious when interacting with others, even in casual or familiar social situations?",
        "Do you frequently experience nervousness or self-doubt in social settings, even when the situation seems minor or unthreatening to others?",
        "Do you avoid speaking in front of groups or participating in conversations due to a strong fear of being judged, embarrassed, or saying something wrong?",
        "Do social situations cause intense fear or physical symptoms such as sweating, nausea, or a racing heart, making it difficult to stay calm and comfortable?",
        "Do you tend to isolate yourself or avoid gatherings, events, or interactions because the fear of social situations feels overwhelming?",
    ],
    "PDD (Persistent Depressive Disorder)": [
        "Do you frequently experience long-lasting periods of sadness or emotional numbness, along with low energy, making it difficult to engage in daily activities or responsibilities?",
        "Do you often feel down, unmotivated, or emotionally drained for several days at a time, even if you manage to go through your daily routine without major disruptions?",
        "Do you struggle with a persistent sense of sadness, hopelessness, or exhaustion that lasts for weeks or months, making it difficult to find joy, stay productive, or connect with others?",
        "For more than two years, have you consistently felt emotionally drained, unmotivated, or deeply sad, to the point where it negatively impacts your ability to work, maintain relationships, or take care of yourself?",
        "Do you experience overwhelming feelings of hopelessness, low self-worth, or even suicidal thoughts that make it nearly impossible to function in daily life without immediate help or support?",
    ],
    "OCD (Obsessive-Compulsive Disorder)": [
        "Do you frequently experience intrusive, unwanted thoughts or feelings of discomfort that are difficult to ignore and cause distress in your daily life?",
        "Do you often feel compelled to double-check things (e.g., locks, appliances) or arrange objects in a specific way, to the point where it consumes your time or causes distress if not done?",
        "Do you spend a significant portion of your day (e.g., 1-2 hours or more) on repetitive thoughts or behaviors, feeling unable to stop even though you recognize they may be excessive or irrational?",
        "Do your obsessive thoughts or compulsive behaviors cause extreme distress, interfere with your work, relationships, or daily activities, and feel uncontrollable most of the time?",
        "Do you feel completely overwhelmed by obsessive thoughts or compulsive behaviors, spending several hours a day performing rituals, to the extent that you struggle to function without external support or intervention?",
    ],
    "PTSD (Post-Traumatic Stress Disorder)": [
        "Do you find yourself troubled by memories of a past traumatic event, where thoughts, emotions, or physical reactions make it difficult to fully move on with your daily life?",
        "Do you occasionally experience distressing reminders, thoughts, or feelings about a past traumatic event, even if they happen infrequently, yet still cause discomfort when they arise?",
        "Do you struggle with recurring flashbacks, nightmares, or anxiety about a past traumatic event, making it difficult to concentrate, regulate your mood, or feel at ease in daily situations?",
        "Do you actively avoid people, places, or situations that remind you of the trauma, feel constantly tense or on edge, or experience emotional numbness, making it challenging to maintain relationships or complete daily tasks?",
        "Do overwhelming memories of the trauma severely impact your ability to function, causing extreme panic, insomnia, or hopelessness, or leading to thoughts of self-harm or feeling unsafe in your own mind?",
    ]
};
let currentCategoryIndex = 0;
let currentQuestionIndex = 0;
const categories = Object.keys(questionCategories);
const scores = {};
const chatBody = document.getElementById("chatBody");
const responseField = document.getElementById("response");
const nextButton = document.getElementById("nextBtn");

// Initialize scores for each category
categories.forEach(category => scores[category] = 0);

// Function to display chatbot messages
const displayMessage = (message, type = "bot") => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type === "bot" ? "bot-message" : "user-message");
    messageDiv.textContent = message;

    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to latest message
};

// Function to load the next question
const loadNextQuestion = () => {
    const currentCategory = categories[currentCategoryIndex];
    const currentQuestions = questionCategories[currentCategory];

    if (currentQuestionIndex < currentQuestions.length) {
        displayMessage(currentQuestions[currentQuestionIndex], "bot");
        displayMessage("Please answer in Yes/No + Explanation format.", "bot");
    } else if (currentCategoryIndex < categories.length - 1) {
        displayCategorySum(currentCategory);
        currentCategoryIndex++;
        currentQuestionIndex = 0;
        loadNextQuestion();
    } else {
        displayCategorySum(currentCategory);
        displayMessage("Thank you for completing the assessment!", "bot");
        nextButton.style.display = "none";
        responseField.style.display = "none";
        findHighestScoreCategory(); // Find and open the highest score category page
    }
};

// Function to display the category score
const displayCategorySum = (category) => {
    displayMessage(`Your score: ${scores[category]} points`, "bot");
};

// Function to find the disorder with the highest score and open its page
const findHighestScoreCategory = () => {
    const highestScoreCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const coreCategory = highestScoreCategory.split(" ")[0]; // Extract only the core category name
    displayMessage(`The disorder with the highest score is: ${highestScoreCategory}`, "bot");
    console.log("Highest score category:", coreCategory); // Debugging line

    const pageMapping = {
        "OCD": "adv_ocd2.html",
        "SAD": "adv_sad2.html",
        "PTSD": "adv_ptsd2.html",
        "PDD": "adv_pdd2.html"
    };

    const page = pageMapping[coreCategory];
    console.log("Page to open:", page); // Debugging line

    if (page) {
        console.log(`Redirecting to: ${window.location.href}`);
        setTimeout(() => {
            window.location.assign(page);
        }, 2000); // Delay of 2 seconds to allow message to display
    } else {
        displayMessage("Error: Unable to find the corresponding page.", "bot");
    }
};

// Event listener for the "Send" button
nextButton.addEventListener("click", () => {
    const userResponse = responseField.value.trim();
    if (!userResponse) {
        alert("Please provide an answer before proceeding.");
        return;
    }

    displayMessage(userResponse, "user");

    if (userResponse.toLowerCase().startsWith("yes")) {
        scores[categories[currentCategoryIndex]] += currentQuestionIndex + 1;
    }

    responseField.value = "";
    currentQuestionIndex++;
    loadNextQuestion();
});

// Allow user to press Enter instead of clicking the button
responseField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        nextButton.click();
    }
});

// Start chatbot
loadNextQuestion();




// Send message to backend
function sendToBackend(message) {
    fetch('http://127.0.0.1:5000/save-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    });
  }
  
  // Example use when sending a message
  function addMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const msg = document.createElement('div');
    msg.innerText = message;
    chatBox.appendChild(msg);
  
    sendToBackend(message); // Save to DB
  }
  // Inside chat2.js, after the chatBody is updated:
localStorage.setItem("therabot_chat_history", document.getElementById("chatBody").innerHTML);