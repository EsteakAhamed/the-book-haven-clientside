import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
    };
    try {
      await axios.post("http://localhost:5000/add-book", book);
      toast.success("Book added successfully");
      setFormData({
        title: "",
        author: "",
        genre: "",
        rating: "",
        summary: "",
        coverImage: "",
      });
    } catch (err) {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="input input-bordered w-full"
          required
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="input input-bordered w-full"
          required
        />
        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1–5)"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="Paste imgbb image URL (optional)"
          className="input input-bordered w-full"
        />
        {formData.coverImage && (
          <img
            src={formData.coverImage}
            alt="Preview"
            className="w-full h-64 object-cover rounded-md"
          />
        )}
        <button type="submit" className="btn btn-primary w-full text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;