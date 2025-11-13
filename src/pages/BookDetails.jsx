import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/book-details/${id}`)
            .then(res => setBook(res.data));

        const fetchComments = () => {
            axios.get(`http://localhost:5000/comments/${id}`)
                .then(res => setComments(res.data));
        };

        fetchComments();
        const interval = setInterval(fetchComments, 3000);
        return () => clearInterval(interval);
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            bookId: id,
            userName: user.displayName,
            photoURL: user.photoURL,
            comment: newComment
        };

        await axios.post("http://localhost:5000/comments", commentData);
        setNewComment("");
        toast.success("Comment added");
    };

    if (!book) return <div className="text-center py-20">Loading book details...</div>;

    return (
        <div className="container mx-auto py-6">
            <div className="max-w-3xl mx-auto bg-base-100 shadow-md rounded-lg p-6">
                <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover rounded-md mb-4" />
                <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-500 mb-1">by {book.author}</p>
                <p className="text-sm text-gray-600 mb-4">Genre: {book.genre} | Rating: {book.rating}</p>
                <p className="text-base text-gray-700 mb-4">{book.summary}</p>
                <p className="text-sm text-gray-500 mb-6">Added by: {book.userEmail}</p>

                {/* Comment Form */}
                {user && (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="textarea textarea-bordered w-full mb-2"
                            required
                        />
                        <button type="submit" className="btn btn-primary w-full text-white">Post Comment</button>
                    </form>
                )}

                {/* Comments Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Comments</h3>
                    {comments.length === 0 ? (
                        <p className="text-gray-500">No comments yet.</p>
                    ) : (
                        comments.map((c, i) => (
                            <div key={i} className="flex items-start gap-4 mb-4">
                                <img src={c.photoURL} alt={c.userName} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{c.userName}</p>
                                    <p className="text-sm text-gray-700">{c.comment}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;