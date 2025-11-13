// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import BookDetails from "../pages/BookDetails";
import UpdateBook from "../pages/UpdateBook";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "../layout/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> }, // ✅ UNCOMMENT THIS
            { path: "/all-books", element: <AllBooks /> },
            { path: "/add-book", element: <PrivateRoute><AddBook /></PrivateRoute> },
            { path: "/my-books", element: <PrivateRoute><MyBooks /></PrivateRoute> },
            { path: "/book-details/:id", element: <PrivateRoute><BookDetails /></PrivateRoute> },
            { path: "/update-book/:id", element: <PrivateRoute><UpdateBook /></PrivateRoute> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
]);

export default router;
