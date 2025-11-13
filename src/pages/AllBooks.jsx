import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [sortOrder, setSortOrder] = useState("none");

    useEffect(() => {
        axios.get("http://localhost:5000/all-books")
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);

    const sortedBooks = [...books].sort((a, b) => {
        const ratingA = parseFloat(a.rating);
        const ratingB = parseFloat(b.rating);
        if (sortOrder === "asc") return ratingA - ratingB;
        if (sortOrder === "desc") return ratingB - ratingA;
        return 0;
    });

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">All Books</h2>

            <div className="flex justify-end mb-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="select select-bordered w-48"
                >
                    <option value="none">Sort by Rating</option>
                    <option value="asc">Rating: Low to High</option>
                    <option value="desc">Rating: High to Low</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Title</th><th>Author</th><th>Genre</th><th>Rating</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBooks.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.rating}</td>
                                <td>
                                    <Link to={`/book-details/${book._id}`} className="btn btn-sm btn-outline">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBooks;