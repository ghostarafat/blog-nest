"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "../../firebase/ProtectedRoute";

export default function ManageProductsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts
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

  // Delete blog post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Post deleted successfully!");
      } else {
        toast.error("Delete failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <Toaster />
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Manage Blog Posts
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center">No posts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Short Description</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Publish Date</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="p-3 font-medium">{post.title}</td>

                    <td className="p-3">
                      {post.shortDescription.length > 50
                        ? post.shortDescription.slice(0, 50) + "..."
                        : post.shortDescription}
                    </td>

                    <td className="p-3">{post.category || "-"}</td>

                    <td className="p-3">{post.publishDate || "-"}</td>

                    <td className="p-3 text-center space-x-2">
                      <Link
                        href={`/items/${post._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
