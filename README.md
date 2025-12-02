# StudyFlow

 StudyFlow is a full-stack study management system where users can organize their learning using **decks**, **flashcards**, and **notes**, powered by a Node.js backend and a React-based frontend.


# Frontend (React App)

The frontend of StudyFlow is a clean and minimal React-based interface where users can manage their **decks**, **flashcards**, and **study items** easily.

- **Frontend Features**

  - Login and Signup UI
  - Fully authenticated interface (JWT stored in localStorage)
  - Dashboard overview showing:
    - Total **study items**
    - Daily **Study Streak**
    - A **Motivation Quote** of the day
  - Deck management UI (create, edit, delete)
  - Study Items interface for detailed concepts
  - Responsive and minimal UI design
  - Complete integration with backend API

---

## How to Run Frontend Locally


1. Go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Run the app:
   ```bash
   npm run dev
   ```


---


# Backend

StudyFlow is a backend service built to help users organize their learning material better.
It allows users to create **decks**, add **flashcards** for quick revision, and write **notes** for deeper concepts — all in one place.

---

## Features

- **User Authentication**

  - JWT-based authentication
  - Only authenticated users can access dashboard, decks, flashcards, and notes
  - Each user can access **only their own data**

- **Deck Management**

  - Create new decks
  - Edit deck title/description
  - Delete decks
  - Each deck contains **flashcards** and **notes**
  - (No public/private or role-based system **yet**)

- **Flashcards & Notes**

  - Add flashcards to each deck
  - Add notes linked to a deck
  - View all decks with flashcards and notes (using Mongoose virtual populate)
  - Secure access — users can only view or modify their own data

- **Secure Data Access**

  - Deck visibility and editing is checked through middleware to make sure only
    allowed users can access or modify each deck

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- dotenv for environment variables
- Github Actions CI/CD pipeline

---

## How to Run Locally

1. **Clone this repository**

   ```bash
    git clone https://github.com/kritithakur14/StudyFlow.git


   ```

2. Install dependencies:

   ```bash
   npm install


   ```

3. Create a .env file in the root directory and add:

   ```bash
   PORT = 8000

   MONGODB_URL = your_mongodb_connection_string

   JWT_SECRET = your_secret_key

   ```

4. Start the server
   ```bash
   npm run dev
   ```

---

## Future Enhancements

- Add Collaboration (viewers/editors)
- Add Public/Private deck modes
- Add Role-based access control
- Add Admin dashboard
- Improve performance and caching

---

## Author

**Kriti Thakur**
[GitHub Profile](https://github.com/kritithakur14)
