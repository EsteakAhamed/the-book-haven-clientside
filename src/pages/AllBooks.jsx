import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/all-books").then(res => setBooks(res.data));
    }, []);

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">All Books</h2>
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
                                <td><Link to={`/book-details/${book._id}`} className="btn btn-sm btn-outline">View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBooks;