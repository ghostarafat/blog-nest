import Link from "next/link";
import Image from "next/image";

// Dummy Data (Replace with real API later)
const blogs = [
  {
    _id: "1",
    title: "Why React 19 Is a Game Changer",
    category: "Programming",
    thumbnail: "/img/react19.jpg",
    description:
      "React 19 brings new hooks, improved performance, and server component upgrades...",
    date: "Dec 2025",
  },
  {
    _id: "2",
    title: "Mastering Node.js Performance",
    category: "Programming",
    thumbnail: "/img/node.jpg",
    description:
      "Learn how to optimize your Node.js backend for high traffic and scalability...",
    date: "Jan 2026",
  },
  {
    _id: "3",
    title: "10 Best Travel Destinations in 2025",
    category: "Travel",
    thumbnail: "/img/travel.jpg",
    description:
      "Explore the most beautiful and exciting places you must visit in 2025...",
    date: "Nov 2025",
  },
];

export default function CategoryPage({ params }) {
  const { category } = params;

  // Filter blogs by category
  const filteredBlogs = blogs.filter(
    (blog) => blog.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 capitalize">
        Category: <span className="text-blue-600">{category}</span>
      </h1>

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No blogs found in this category ❌
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Link
              href={`/blogs/${blog._id}`}
              key={blog._id}
              className="border rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="w-full h-40 relative rounded-lg overflow-hidden">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-xl font-semibold mt-3 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {blog.description}
              </p>

              <p className="text-gray-500 text-xs mt-2">📅 {blog.date}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
