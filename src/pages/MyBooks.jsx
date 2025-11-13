import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);

    const fetchBooks = () => {
        axios.get(`https://the-book-haven-serverside.vercel.app/myBooks/${user.email}`).then(res => setBooks(res.data));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`https://the-book-haven-serverside.vercel.app/delete-book/${id}`);
        toast.success("Book deleted");
        fetchBooks();
    };

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">My Books</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Title</th><th>Author</th><th>Genre</th><th>Rating</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.rating}</td>
                                <td className="flex gap-2">
                                    <Link to={`/update-book/${book._id}`} className="btn btn-sm btn-outline">Edit</Link>
                                    <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-error text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooks;