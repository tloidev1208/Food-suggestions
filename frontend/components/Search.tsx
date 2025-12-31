"use client";

import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:flex items-center bg-white rounded-xl shadow px-3 py-2 mx-8 flex-1 max-w-xl"
    >
      <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm món ăn..."
        className="bg-transparent outline-none flex-1 text-gray-700"
      />
      <button
        type="submit"
        className="px-4 py-1 rounded-full bg-red-500 text-white font-semibold ml-2 hover:bg-red-600"
      >
        Tìm
      </button>
    </form>
  );
};

export default SearchBar;
