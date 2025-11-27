//  src/app/items/page.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ItemListPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all blog posts from Express API
  const fetchPosts = async () => {
    try {
      const res = await fetch("https://blog-nest-api-server.vercel.app/items");
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      toast.error("Failed to load posts!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts by search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        (post.shortDescription &&
          post.shortDescription.toLowerCase().includes(term)) ||
        (post.category && post.category.toLowerCase().includes(term))
    );

    setFilteredPosts(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <Toaster />

      <motion.h1
        className="text-3xl font-bold mb-2 text-center text-indigo-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Blog Posts
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore our latest posts, tutorials, and articles curated for you.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </motion.div>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No posts found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              className="border border-gray-400 rounded-lg p-4 shadow hover:shadow-xl transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-40 bg-gray-200 mb-3 flex items-center justify-center overflow-hidden rounded group">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>

              <h2 className="font-bold text-lg mb-1">{post.title}</h2>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {post.shortDescription || post.description || "No description"}
              </p>

              <div className="text-gray-500 text-xs mb-3 flex justify-between">
                <span>{post.category || "Uncategorized"}</span>
                <span>{post.publishDate || "-"}</span>
              </div>

              <Link
                href={`/items/${post._id}`}
                className="block w-full bg-indigo-600 text-white px-3 py-2 rounded text-center hover:bg-indigo-700 transition"
              >
                Details
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
