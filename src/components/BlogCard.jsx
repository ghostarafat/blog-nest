"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogCard({ blog }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blogs/${blog._id}`)}
      className="bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl transition p-4"
    >
      {/* Thumbnail */}
      <div className="w-full h-48 relative rounded-lg overflow-hidden">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold hover:text-blue-600 transition line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {blog.description}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>✍ {blog.author}</span>
          <span>{blog.date}</span>
        </div>
      </div>
    </div>
  );
}
