import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        axios.get(`https://the-book-haven-serverside.vercel.app/book-details/${id}`).then(res => setFormData(res.data));
    }, [id]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`https://the-book-haven-serverside.vercel.app/update-book/${id}`, formData);
        toast.success("Book updated");
        navigate("/my-books");
    };

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">Update Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={formData.title || ""} onChange={handleChange} className="input input-bordered w-full" required />
                <input name="author" value={formData.author || ""} onChange={handleChange} className="input input-bordered w-full" required />
                <input name="genre" value={formData.genre || ""} onChange={handleChange} className="input input-bordered w-full" required />
                <input name="rating" value={formData.rating || ""} onChange={handleChange} className="input input-bordered w-full" required />
                <textarea name="summary" value={formData.summary || ""} onChange={handleChange} className="textarea textarea-bordered w-full" required />
                <input name="coverImage" value={formData.coverImage || ""} onChange={handleChange} className="input input-bordered w-full" required />
                <button type="submit" className="btn btn-primary w-full text-white">Update</button>
            </form>
        </div>
    );
};

export default UpdateBook;