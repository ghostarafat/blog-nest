"use client";
import ProtectedRoute from "../../firebase/firebase.configProtectedRoute";
import Link from "next/link";

export default function ItemListPage() {
  // Sample data
  const items = [
    {
      id: 1,
      title: "Item One",
      description: "Short description 1",
      price: "$10",
    },
    {
      id: 2,
      title: "Item Two",
      description: "Short description 2",
      price: "$15",
    },
    {
      id: 3,
      title: "Item Three",
      description: "Short description 3",
      price: "$20",
    },
    {
      id: 4,
      title: "Item Four",
      description: "Short description 4",
      price: "$25",
    },
    {
      id: 5,
      title: "Item Five",
      description: "Short description 5",
      price: "$30",
    },
    {
      id: 6,
      title: "Item Six",
      description: "Short description 6",
      price: "$35",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Item List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <div className="h-32 bg-gray-200 mb-3 flex items-center justify-center">
                <span className="text-gray-500">Image</span>
              </div>
              <h2 className="font-bold text-lg mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="font-semibold mb-3">{item.price}</p>
              <Link
                href={`/item-details/${item.id}`}
                className="inline-block bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
