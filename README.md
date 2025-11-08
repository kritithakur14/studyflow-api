# StudyFlow API

StudyFlow API is a backend project built to help users organize their learning material better.
It allows users to create **decks**, add **flashcards** for quick revision, and write **notes** for deeper concepts — all in one place.

---

## Features

- **User Authentication & Authorization**

  - JWT based login system.
  - Role-based access control for decks.

- **Deck Management**

  - Create, update, delete decks.
  - Make decks **public** and **private**.

- **Collaboration**

  - Add collaborators to a deck (viewer / editor roles).
  - Remove collaborators.
  - Public decks are viewable by anyone.

- **Flashcards & Notes**

  - Add flashcards to each deck.
  - Add notes linked to decks.
  - View all decks with flashcards and notes (using Mongoose virtual populate).
  - Secure access — users can only view or modify their own data.

- **Secure Data Access**

  - Deck visibility and editing is checked through middleware to make sure only
    allowed users can access or modify each deck.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Custom Authorization Middleware (RBAC)

---

## How to Run Locally

1. **Clone this repository**

   ```bash
   git clone https://github.com/kritithakur14/studyflow-api.git

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

- Add pagination and search to improve browsing and filtering of decks.
- Integrate a CI/CD pipeline for automated testing and deployment.
- Build a React-based dashboard for managing decks, flashcards and collaborators.

---

## Author

**Kriti Thakur**
[GitHub Profile](https://github.com/kritithakur14)
