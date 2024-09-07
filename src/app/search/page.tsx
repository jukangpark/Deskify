"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-transparent dark:text-white"
        placeholder="Search..."
      />
    </form>
  );
};

const SearchResults = ({ results }: { results: string[] }) => {
  if (results.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400" />;
  }

  return (
    <ul className="mt-4">
      {results.map((result, index) => (
        <li
          key={index}
          className="p-4 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          {result}
        </li>
      ))}
    </ul>
  );
};

const SearchPage = () => {
  const user = useRequireAuth();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    // 예시로 검색 결과를 단순 배열로 설정 (실제 API 호출 필요)
    const results = ["Result 1", "Result 2", "Result 3"].filter((result) =>
      result.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center h-screen bg-transparent p-4">
      {/* 검색 바 */}
      <SearchBar onSearch={handleSearch} />

      {/* 검색 결과 */}
      <div className="w-full max-w-2xl mt-4">
        <SearchResults results={searchResults} />
      </div>
    </div>
  );
};

export default SearchPage;
