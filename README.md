# StudyFlow API

StudyFlow API is a backend project built to help users organize their learning material better.
It allows users to create **decks**, add **flashcards** for quick revision, and write **notes** for deeper concepts — all in one place.

---

## Features
- User Authentication(JWT based)
- Create and manage decks
- Add flashcards to each deck
- Add notes linked to decks
- View all decks with flashcards and notes (using Mongoose virtual populate)
- Secure access — users can only view or modify their own data

---

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

---

##  How to Run Locally

1. **Clone this repository**
   ```bash
   git clone https://github.com/kritithakur14/studyflow-api.git

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory and add:
   ```bash
   PORT = 8000

   MONGODB_URL = your_mongodb_connection_string

   JWT_SECRET = your_secret_key

4. Start the server
  ```bash
   npm start

---

## Future Enhancements

- Add pagination and search
- CI/CD pipeline integration(for automated deployment)
- Frontend dashboard for StudyFlow

---

## Author

**Kriti Thakur**
[GitHub Profile](https://github.com/kritithakur14)