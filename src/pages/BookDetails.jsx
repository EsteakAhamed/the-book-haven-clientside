import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/book-details/${id}`)
            .then(res => setBook(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!book) {
        return <div className="text-center py-20">Loading book details...</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="max-w-3xl mx-auto bg-base-100 shadow-md rounded-lg p-6">
                <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover rounded-md mb-4" />
                <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-500 mb-1">by {book.author}</p>
                <p className="text-sm text-gray-600 mb-4">Genre: {book.genre} | Rating: {book.rating}</p>
                <p className="text-base text-gray-700 mb-4">{book.summary}</p>
                <p className="text-sm text-gray-500">Added by: {book.userEmail}</p>
            </div>
        </div>
    );
};

export default BookDetails;