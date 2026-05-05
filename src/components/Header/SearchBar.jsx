"use client";

import { useState } from "react";
import { HeaderSVGs } from "./HeaderSVGs";

function SearchBar() {
  const [search, setSearch] = useState("top-1/7 left-1/8");
  const [inputval, setInputval] = useState("");

  return (
    <div
      onClick={() => setSearch("-top-1/6 left-1/16 text-sm opacity-60")}
      onBlur={() =>
        inputval == "" ? setSearch("top-1/7 left-1/8 bg-cyan-900") : ""
      }
      className="relative flex w-1/2 m-2 rounded-full outline-0 outline-cyan-400 bg-cyan-900 hover:outline-2 focus-within:bg-cyan-700 focus-within:outline-2 focus-within:border-cyan-700"
    >
      <input
        type="text"
        defaultValue={inputval}
        onChange={(e) => setInputval(e.target.value.trim())}
        className="my-auto p-0.5 pl-4 w-full h-9 text-[13px] text-white focus:outline-0"
      />
      <p
        className={`px-2 absolute ${search} text-gray-200 rounded-full bg-cyan-900 select-none pointer-events-none font-mono duration-500`}
      >
        What are you looking for ?
      </p>
      <div className="bg-cyan-600 rounded-full hover:scale-110 hover:rotate-90 duration-300">
        {HeaderSVGs.Search}
      </div>
    </div>
  );
}

export default SearchBar;
