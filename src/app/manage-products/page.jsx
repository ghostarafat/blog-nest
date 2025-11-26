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
      const res = await fetch("https://blog-nest-api-server.vercel.app/items");
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
      const res = await fetch(
        `https://blog-nest-api-server.vercel.app/items/${id}`,
        {
          method: "DELETE",
        }
      );

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
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Toaster />
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">
              Manage Blog Posts
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View, review and delete blog posts from your dashboard.
            </p>
          </div>

          <Link
            href="/dashboard/add-blog"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition"
          >
            + Add New Post
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 sm:p-6">
          {loading ? (
            <div className="py-10 text-center text-gray-500 text-sm">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500 mb-3">No posts found.</p>
              <Link
                href="/dashboard/add-blog"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Create your first post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-100 rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="p-3 border-b">Image</th>
                    <th className="p-3 border-b">Title</th>
                    <th className="p-3 border-b">Short Description</th>
                    <th className="p-3 border-b">Category</th>
                    <th className="p-3 border-b">Publish Date</th>
                    <th className="p-3 border-b text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b last:border-b-0 hover:bg-gray-50/70 transition"
                    >
                      {/* Image */}
                      <td className="p-3 align-middle">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-14 h-14 object-cover rounded-md border"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400 border">
                            No Image
                          </div>
                        )}
                      </td>

                      {/* Title */}
                      <td className="p-3 align-middle">
                        <p className="font-medium text-gray-800 line-clamp-2">
                          {post.title}
                        </p>
                      </td>

                      {/* Short Description */}
                      <td className="p-3 align-middle max-w-xs">
                        <p className="text-gray-600 line-clamp-2">
                          {post.shortDescription?.length > 80
                            ? post.shortDescription.slice(0, 80) + "..."
                            : post.shortDescription}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="p-3 align-middle">
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                          {post.category || "Uncategorized"}
                        </span>
                      </td>

                      {/* Publish Date */}
                      <td className="p-3 align-middle text-gray-600">
                        {post.publishDate || "-"}
                      </td>

                      {/* Actions */}
                      <td className="p-3 align-middle text-center space-x-2">
                        <Link
                          href={`/items/${post._id}`}
                          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition"
                        >
                          View
                        </Link>

                        <button
                          onClick={() => handleDelete(post._id)}
                          className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Small footer text */}
              <p className="mt-3 text-[11px] text-gray-400">
                Tip: Keep your titles short and add clear categories to make
                managing blogs easier.
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
