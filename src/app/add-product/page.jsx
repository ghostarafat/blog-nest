"use client";
import ProtectedRoute from "../../firebase/ProtectedRoute";
import { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Product added: ${title}`);
    setTitle("");
    setDesc("");
  };

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto p-6 mt-10 border rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
