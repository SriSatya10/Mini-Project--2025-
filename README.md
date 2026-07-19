# Mini-Project--2025-
https://srisatya10.github.io/Mini-Project--2025-/

# TheraBot: Mental Health Support Platform

TheraBot is a digital mental health support system engineered to deliver personalized, real-time emotional assistance for individuals experiencing stress, anxiety, and early-stage depressive symptoms. The application is designed to act as an accessible first line of support, bridging the gap between self-help and professional mental health care through a secure, private, and user-centric platform.

---

## Project Overview

TheraBot functions as an interactive conversational agent that interacts with users through structured and free-text dialogue. By combining scientifically framed questions, keyword-based emotional analysis, and an internal clinical scoring mechanism, the system evaluates emotional well-being and delivers tailored coping strategies and resources.

The core objective of this project is to demonstrate how rule-based logic, structured clinical assessments, and modern full-stack web architecture can be integrated into a practical mental health application while maintaining strict user privacy and seamless data persistence.

---

## Key Features

### Anonymous and Confidential Access
- Users can interact with TheraBot securely.
- Only minimal information, such as age and current challenges, is collected to create a personalized interaction zone.
- Privacy-first design ensures user data is securely isolated by unique user identifiers (UIDs).

### Interactive Chat Interface
- Utilizes structured, scenario-based questioning including yes/no prompts, mood rating scales, and open-ended text responses.
- Implements keyword detection to identify emotional triggers such as stress, anxiety, and depression.
- Responses are mapped to an internal scoring system where positive indicators receive lower scores and negative indicators receive higher scores.
- Enables real-time emotional state evaluation during the conversation.

### Disorder Intensity Assessment
TheraBot evaluates patterns in user responses to identify early indicators of mental health conditions, including:
- Obsessive-Compulsive Disorder (OCD)
- Persistent Depressive Disorder (PDD)
- Post-Traumatic Stress Disorder (PTSD)
- Social Anxiety Disorder (SAD)

Based on cumulative scores, the system classifies the detected condition into Mild, Moderate, or Severe. This classification is used strictly for guidance and awareness, not as a clinical diagnosis.

### Seamless Cloud Sync & Session Management
- **Background Synchronization:** A custom sync service automatically mirrors local browser data to the cloud database without interrupting the user experience.
- **Isolated User Histories:** Chat sessions and assessment scores are strictly scoped to individual user accounts, ensuring complete data separation.
- **Permanent Backup:** Users can safely log out and return later, with their chat history and progress perfectly restored from the PostgreSQL database.

### Personalized Recommendation System
- Delivers tailored coping strategies based on assessed emotional intensity.
- Recommends relaxation techniques, breathing exercises, motivational content, and mindfulness practices.
- Provides access to self-help PDFs for guided journaling, stress management, and emotional regulation.
- In high-risk situations, the system displays emergency contact information and professional support resources.

---

## Technical Architecture

### Frontend Logic
- **UI/UX:** Built with modern HTML5, CSS3, and **Tailwind CSS** featuring premium glass-morphism aesthetics, responsive grids, and fluid animations.
- **Client-Side Engine:** Vanilla JavaScript (ES6+) manages the chat flow, dynamic question loading, and keyword detection.
- **State Management:** Intercepts `localStorage` to provide blazing-fast UI updates while simultaneously delegating permanent storage to the background sync service.

### Backend API
- **Server:** A robust **Node.js** and **Express.js** REST API handles secure data transactions and application flow control.
- **Synchronization:** Endpoints are designed using `UPSERT` methodologies to gracefully handle repeat interactions and real-time frontend syncing.

### Data Storage
- **PostgreSQL Database:** Replaces legacy flat-file storage with a highly relational database architecture. Includes robust tables for `users`, `assessments`, `advanced_assessments`, and `chat_history`.
- **Connection Pooling:** Utilizes the `pg` library for efficient, scalable database connection management.

---

## Significance of the Project

TheraBot demonstrates the practical application of conversational systems in mental health support, emphasizing ethical design, privacy preservation, and user-centered interaction. The project showcases how structured logic, emotional assessment frameworks, and modern full-stack web technologies (Node/Express/PostgreSQL) can be seamlessly combined to build a meaningful, highly scalable, and socially impactful application.

---

## Disclaimer

TheraBot is intended as a supportive and informational tool only. It does not replace professional mental health diagnosis or treatment. Users experiencing severe distress are strongly encouraged to seek help from qualified mental health professionals.
