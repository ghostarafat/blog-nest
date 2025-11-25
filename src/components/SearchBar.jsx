"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    router.push(`/search?query=${text}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search blogs..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="px-3 py-2 border rounded-lg w-40 md:w-56"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
