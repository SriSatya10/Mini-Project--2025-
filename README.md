# Mini-Project--2025-
 https://srisatya10.github.io/Mini-Project--2025-/

 # TheraBot: Mental Health Chatbot

TheraBot is a digital mental health support system engineered to deliver personalized, real-time emotional assistance for individuals experiencing stress, anxiety, and early-stage depressive symptoms. The application is designed to act as an accessible first line of support, bridging the gap between self-help and professional mental health care through a secure, private, and user-centric platform.

---

## Project Overview

TheraBot functions as an intelligent conversational agent that interacts with users through structured and free-text dialogue. By combining scientifically framed questions, keyword-based emotional analysis, and an internal scoring mechanism, the system evaluates emotional well-being and delivers tailored coping strategies and resources.

The core objective of this project is to demonstrate how conversational AI, rule-based logic, and structured assessments can be integrated into a practical mental health application while maintaining user privacy and data minimalism.

---

## Key Features

### Anonymous and Confidential Access
- Users can interact with TheraBot without revealing personal identity.
- Only minimal information, such as age, is collected to create a personalized interaction zone.
- No sensitive personal data is stored externally, ensuring privacy-first design.

---

### Intelligent Chat Interface
- Utilizes structured, scenario-based questioning including yes/no prompts, mood rating scales, and open-ended text responses.
- Implements keyword detection to identify emotional triggers such as stress, anxiety, and depression.
- Responses are mapped to an internal scoring system where positive indicators receive lower scores and negative indicators receive higher scores.
- Enables real-time emotional state evaluation during the conversation.

---

### Disorder Intensity Assessment
TheraBot evaluates patterns in user responses to identify early indicators of mental health conditions, including:
- Obsessive-Compulsive Disorder (OCD)
- Persistent Depressive Disorder (PDD)
- Post-Traumatic Stress Disorder (PTSD)
- Social Anxiety Disorder (SAD)

Based on cumulative scores, the system classifies the detected condition into:
- Mild
- Moderate
- Severe

This classification is used strictly for guidance and awareness, not as a clinical diagnosis.

---

### Personalized Recommendation System
- Delivers tailored coping strategies based on assessed emotional intensity.
- Recommends relaxation techniques, breathing exercises, motivational content, and mindfulness practices.
- Provides access to self-help PDFs for guided journaling, stress management, and emotional regulation.
- In high-risk situations, the system displays emergency contact information and professional support resources.

---

### Session Management
- Maintains complete chat session history with original conversational formatting.
- Stores recommended resources for future reference.
- Allows users to download their chat sessions for personal records or offline review.

---

## System Workflow

1. User registration or anonymous login is initiated and stored securely.
2. The chatbot presents questions dynamically, one at a time.
3. User responses are validated and analyzed using predefined scoring logic.
4. Trigger words and emotional indicators are detected during the conversation.
5. Scores are aggregated to assess emotional condition and severity level.
6. Personalized results and recommendations are generated and displayed.
7. Session data and recommended resources are optionally stored locally.

---

## Technical Implementation

### Frontend Logic
- JavaScript (ES6+) manages chat flow, dynamic question loading, and keyword detection.
- User inputs are processed in real time and mapped to internal scores.
- Responsive layouts ensure accessibility across different screen sizes.

### Backend Logic
- Node.js is used to handle server-side operations and application flow control.
- Business logic determines assessment thresholds and recommendation mapping.

### Data Storage
- JSON and Local Storage are used to store chat history and recommendations.
- This approach ensures lightweight storage while maintaining user privacy.

---

## Technology Stack

- Frontend: HTML5, CSS3 (Flexbox and Grid), JavaScript (ES6+)
- Backend: Node.js
- Storage: JSON files and browser Local Storage
- Optional Enhancements: Bootstrap for responsive UI and jQuery for DOM manipulation

---

## Significance of the Project

TheraBot demonstrates the practical application of conversational systems in mental health support, emphasizing ethical design, privacy preservation, and user-centered interaction. The project showcases how structured logic, emotional assessment frameworks, and modern web technologies can be combined to build a meaningful, socially impactful application.

---

## Disclaimer

TheraBot is intended as a supportive and informational tool only. It does not replace professional mental health diagnosis or treatment. Users experiencing severe distress are strongly encouraged to seek help from qualified mental health professionals.


