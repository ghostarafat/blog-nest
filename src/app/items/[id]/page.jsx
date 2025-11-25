//  src/app/items/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "../../../firebase/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

export default function ItemDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single blog post from backend
  const fetchPost = async () => {
    try {
      const res = await fetch(`https://blog-nest-api-server.vercel.app/${id}`);
      if (!res.ok) throw new Error("Post not found");

      const data = await res.json();
      setPost(data);
    } catch (err) {
      toast.error("Failed to load post!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 border border-gray-400 rounded-lg shadow">
      <Toaster />

      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>

      {loading ? (
        <p className="text-center">Loading post...</p>
      ) : !post ? (
        <p className="text-center text-red-500 font-semibold">
          Post not found.
        </p>
      ) : (
        <>
          <div className="h-64 bg-gray-200 mb-4 rounded overflow-hidden flex items-center justify-center">
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

          <h1 className="text-3xl font-bold mb-3 text-indigo-600">
            {post.title}
          </h1>

          <p className="text-gray-700 mb-4">{post.content}</p>

          <div className="flex justify-between text-gray-500 text-sm mb-2">
            <span>Category: {post.category || "Uncategorized"}</span>
            <span>Published: {post.publishDate || "N/A"}</span>
          </div>
        </>
      )}
    </div>
  );
}
