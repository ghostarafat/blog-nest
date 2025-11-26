"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState({
    title: "",
    shortDescription: "",
    content: "",
    category: "",
    publishDate: "",
    image: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://blog-nest-api-server.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        toast.success("Blog post added successfully! 🎉");
        setTimeout(() => {
          router.push("/items");
        }, 800);
      } else {
        toast.error("Failed to add post ❌");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <Toaster />
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Add New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={post.shortDescription}
              onChange={handleChange}
              required
              rows={2}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={post.category}
              onChange={handleChange}
              placeholder="e.g. Web Development, Next.js"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-gray-700 mb-1">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              value={post.publishDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={post.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Adding..." : "Add Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
