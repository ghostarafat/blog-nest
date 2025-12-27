"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getReadingTime } from "@/utils/readingTime";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.config";

export default function BlogCard({ blog }) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  // Reading Time & Publish Date
  const readingTime = getReadingTime(blog.description || "");
  const publishDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "Unknown date";

  // Save Blog function
  const handleSave = (id) => {
    if (!user) {
      alert("Please login to save blog");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("savedBlogs")) || [];

    if (saved.includes(id)) {
      alert("Already saved");
      return;
    }

    localStorage.setItem("savedBlogs", JSON.stringify([...saved, id]));
    alert("Blog saved ❤️");
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4">
      {/* Thumbnail */}
      <div
        className="w-full h-48 relative rounded-lg overflow-hidden cursor-pointer"
        onClick={() => router.push(`/items/${blog._id}`)}
      >
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h2
          className="text-xl font-semibold hover:text-blue-600 transition line-clamp-2 cursor-pointer"
          onClick={() => router.push(`/items/${blog._id}`)}
        >
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {blog.description}
        </p>

        {/* Author + Date + Reading Time */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>✍ {blog.author}</span>
          <span>
            🗓 {publishDate} • ⏱ {readingTime}
          </span>
        </div>

        {/* Save Button */}
        <button
          onClick={() => handleSave(blog._id)}
          className="mt-3 px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}
