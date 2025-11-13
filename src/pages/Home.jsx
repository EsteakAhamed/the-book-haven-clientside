// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BookOpen, Plus, Sparkles, Users, BarChart3, Star } from "lucide-react";

const Home = () => {
    const [latestBooks, setLatestBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch latest 6 books from MongoDB
    useEffect(() => {
        const fetchLatestBooks = async () => {
            try {
                const response = await axios.get("https://the-book-haven-serverside.vercel.app/api/books/latest");
                setLatestBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching latest books:", error);
                setLoading(false);
            }
        };

        fetchLatestBooks();
    }, []);

    // Top Genres Data
    const genres = [
        {
            name: "Fantasy",
            image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500",
            description: "Magical worlds and epic adventures",
            count: "250+ Books"
        },
        {
            name: "Mystery",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
            description: "Thrilling detective stories",
            count: "180+ Books"
        },
        {
            name: "Science Fiction",
            image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500",
            description: "Future technology and space",
            count: "200+ Books"
        },
        {
            name: "Romance",
            image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500",
            description: "Love stories that touch hearts",
            count: "220+ Books"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

            {/* Hero Banner Section */}
            <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-4">
                            <BookOpen size={60} className="text-yellow-300" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Welcome to{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                                The Book Haven
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
                            Your Digital Library Companion - Discover, Share, and Manage Your Favorite Books
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/all-books"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                <BookOpen size={20} />
                                Browse All Books
                            </Link>

                            <Link
                                to="/add-book"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                            >
                                <Plus size={20} />
                                Add Your Book
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Books Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-3">
                            <BookOpen size={40} className="text-purple-600 dark:text-purple-400" />
                            Latest Additions
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Discover the newest books added to our collection
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestBooks.slice(0, 6).map((book) => (
                                <div
                                    key={book._id}
                                    className="group bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                                >
                                    {/* Book Cover Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
                                            <Star size={16} fill="currentColor" />
                                            {book.rating}
                                        </div>
                                    </div>

                                    {/* Book Details */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                                            {book.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                            By <span className="font-semibold">{book.author}</span>
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                            {book.summary}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                                                {book.genre}
                                            </span>
                                            <Link
                                                to={`/book-details/${book._id}`}
                                                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition-colors"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* View All Books Button */}
                    <div className="text-center mt-12">
                        <Link
                            to="/all-books"
                            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg"
                        >
                            View All Books
                        </Link>
                    </div>
                </div>
            </section>

            {/* Top Genres Section */}
            <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-3">
                            <Sparkles size={40} className="text-purple-600 dark:text-purple-400" />
                            Top Genres
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Explore books by your favorite categories
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {genres.map((genre) => (
                            <div
                                key={genre.name}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80 cursor-pointer"
                            >
                                {/* Background Image */}
                                <img
                                    src={genre.image}
                                    alt={genre.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-purple-900/90 transition-all duration-300"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">{genre.name}</h3>
                                    <p className="text-gray-200 text-sm mb-2">{genre.description}</p>
                                    <p className="text-purple-300 font-semibold">{genre.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About The Book Haven Section */}
            <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-3">
                                <Sparkles size={40} className="text-purple-600 dark:text-purple-400" />
                                About The Book Haven
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Text Content */}
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                    Welcome to <span className="font-bold text-purple-600 dark:text-purple-400">The Book Haven</span>,
                                    your ultimate digital library companion where book lovers unite! We've created a space where
                                    you can explore, manage, and share your favorite books with a community of passionate readers.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                    Whether you're tracking your reading journey, discovering new titles, or building your
                                    personal collection, The Book Haven makes it simple and enjoyable.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <BookOpen size={24} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-white">Discover Books</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Browse thousands of books across all genres</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Plus size={24} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-white">Manage Your Collection</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Add, update, and organize your personal library</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Star size={24} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-white">Rate & Review</h4>
                                            <p className="text-gray-600 dark:text-gray-400">Share your thoughts and ratings with the community</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 rounded-2xl p-8 shadow-2xl">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
                                                <span className="text-gray-700 dark:text-gray-300">Total Books</span>
                                            </div>
                                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,200+</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Users size={20} className="text-pink-600 dark:text-pink-400" />
                                                <span className="text-gray-700 dark:text-gray-300">Active Readers</span>
                                            </div>
                                            <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">500+</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <BarChart3 size={20} className="text-blue-600 dark:text-blue-400" />
                                                <span className="text-gray-700 dark:text-gray-300">Reviews Written</span>
                                            </div>
                                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3,500+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                            <Sparkles size={40} className="text-yellow-300" />
                            Ready to Start Your Reading Journey?
                        </h2>
                        <p className="text-xl text-gray-100 mb-8">
                            Join our community of book lovers and discover your next favorite read today!
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
