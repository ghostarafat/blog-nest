//  src/app/items/page.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "../../firebase/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

export default function ItemListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blog posts from Express API
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products"); // backend API
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data);
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

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <Toaster />
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          All Blog Posts
        </h1>

        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-400 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="h-40 bg-gray-200 mb-3 flex items-center justify-center overflow-hidden rounded">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-bold text-lg mb-1">{post.title}</h2>

                {/* Short Description */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {post.shortDescription ||
                    post.description ||
                    "No description"}
                </p>

                {/* Category + Publish Date */}
                <div className="text-gray-500 text-xs mb-3 flex justify-between">
                  <span>{post.category || "Uncategorized"}</span>
                  <span>{post.publishDate || "-"}</span>
                </div>

                {/* Details Button */}
                <Link
                  href={`/items/${post._id}`}
                  className="block w-full bg-indigo-600 text-white px-3 py-2 rounded text-center hover:bg-indigo-700 transition"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
