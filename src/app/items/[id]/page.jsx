"use client";
import ProtectedRoute from "../../../firebase/ProtectedRoute";
import { useParams, useRouter } from "next/navigation";

export default function ItemDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  // Sample single item data (replace with real data / Firebase later)
  const item = {
    id,
    title: `Item ${id}`,
    description: `This is the full description for Item ${id}. Lorem ipsum dolor sit amet.`,
    price: `$${10 * id}`,
    date: "2025-11-23",
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6 mt-10 border rounded-lg shadow">
        <button
          onClick={() => router.back()}
          className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
        <div className="h-48 bg-gray-200 mb-4 flex items-center justify-center">
          <span className="text-gray-500">Large Image</span>
        </div>
        <h1 className="text-2xl font-bold mb-3">{item.title}</h1>
        <p className="text-gray-700 mb-2">{item.description}</p>
        <p className="font-semibold mb-1">Price: {item.price}</p>
        <p className="text-gray-500 text-sm">Date: {item.date}</p>
      </div>
    </ProtectedRoute>
  );
}
