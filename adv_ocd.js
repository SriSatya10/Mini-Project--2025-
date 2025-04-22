document.addEventListener("DOMContentLoaded", function () {
    // Object to hold ratings for different questions
    const ratings = {};

    // Function to handle star rating selection
    document.querySelectorAll(".star-rating").forEach(rating => {
        const stars = rating.querySelectorAll(".star");
        const questionId = rating.dataset.questionId;

        // Initialize stars based on stored ratings (if any)
        const currentRating = ratings[questionId] || 0;
        updateStars(stars, currentRating);

        stars.forEach(star => {
            star.addEventListener("click", function () {
                const value = parseInt(star.getAttribute("data-value"));

                // Update the selected rating for the question
                ratings[questionId] = value;

                // Highlight selected stars
                stars.forEach((s, i) => {
                    s.classList.toggle("active", i < value);
                    s.classList.remove("clicked");  // Reset the clicked class for all stars
                });

                // Store the value for calculation
                rating.setAttribute("data-selected", value);
            });
        });
    });

    // Function to update star colors based on the rating
    function updateStars(stars, rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add("clicked");
            } else {
                star.classList.remove("clicked");
            }
        });
    }

    // Function to calculate the score from the ratings
    function calculateScore() {
        let score = 0;

        // Collect star-rating scores
        document.querySelectorAll(".star-rating").forEach(rating => {
            const selectedValue = rating.getAttribute("data-selected");
            if (selectedValue) {
                score += parseInt(selectedValue);
            }
        });

        // Collect choice-based scores (assuming you have <select> elements for questions)
        document.querySelectorAll(".choice-input").forEach(select => {
            if (select.value !== "0") {
                score += parseInt(select.value);
            }
        });

        // Collect checkbox-based scores
        document.querySelectorAll(".checkbox-input:checked").forEach(checkbox => {
            score += parseInt(checkbox.value);
        });

        // Display the result
        document.getElementById("result").innerText = `Your Total Score: ${score}`;
        document.getElementById("result-section").style.display = "block";
    }
});
