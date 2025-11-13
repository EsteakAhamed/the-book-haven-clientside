# The Book Haven

Live site: https://the-book-haven-by-esteakahamed.netlify.app/

## About

The Book Haven is a client-side React application for browsing and managing a personal collection of books. It provides a responsive UI for discovering books, viewing details, and performing CRUD operations for authenticated users.

## Key features

- Browse all books with sorting and search-friendly UI.
- View detailed information for each book (description, author, rating).
- Add new books using a form with validation (authenticated users).
- Update and delete books you own (authentication/authorization enforced).
- User authentication (register / login) and protected routes for user-specific pages.
- Responsive layout that works well on desktop and mobile.

## Technologies used

- React (Vite)
- Tailwind CSS for styling
- Firebase for authentication and backend (client-side config in `firebase/firebase.config.js`)

## How to run locally

1. Clone the repository and change into the client folder:

```powershell
git clone <repo-url>
cd the-book-haven-clientside
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

3. Open the development server URL shown by Vite (usually `http://localhost:5173`).

Notes:
- Ensure you have a `.env` or the Firebase config values set up at `src/firebase/firebase.config.js` if the app requires them to run features that call Firebase.

## Live demo

Visit the live site: https://the-book-haven-by-esteakahamed.netlify.app/

## License & Contact

This project was created by Esteak Ahamed. For questions or feedback, open an issue in the repository or contact the author via their GitHub profile.

