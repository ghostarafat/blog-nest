"use client";
import ProtectedRoute from "../../firebase/ProtectedRoute";

export default function ManageProductsPage() {
  const products = [
    { id: 1, title: "Product 1" },
    { id: 2, title: "Product 2" },
  ];

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Manage Products</h1>
        <ul className="space-y-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <span>{p.title}</span>
              <div className="space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  View
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
