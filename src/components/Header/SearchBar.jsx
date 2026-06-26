"use client";

import { useState, useRef, useEffect } from "react";
import { HeaderSVGs } from "./HeaderSVGs";
import { useNavigate } from "react-router-dom";

// Props: array of coin objects (at least {id, name, symbol, image})
function Searchbar({ coins = [] }) {
  const [inputVal, setInputVal] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Update results whenever inputVal changes
  useEffect(() => {
    if (inputVal.trim().length === 0) {
      setResults([]);
      return;
    }
    const query = inputVal.toLowerCase();
    const filtered = coins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      )
      .slice(0, 10);
    setResults(filtered);
  }, [inputVal, coins]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (coin) => {
    // Navigate or do something with selected coin
    console.log("Selected:", coin);
    navigate(`/coin/${coin.id}`); // navigate to a dynamic url containing the coin id
    setInputVal(coin.name); // optional: fill input with selected coin name
    setIsFocused(false);
  };

  // Placeholder animation logic (your original idea, improved)
  const placeholderClass =
    isFocused || inputVal.length > 0
      ? "-top-1/6 left-1/16 text-sm opacity-60"
      : "top-1/5 left-1/8";

  return (
    <div
      ref={containerRef}
      className="relative w-1/2 m-1 overflow-y-visible z-101"
    >
      <div
        className={`relative flex rounded-full outline-0 outline-cyan-400 bg-cyan-900 hover:outline-2 focus-within:bg-cyan-700 focus-within:outline-2 focus-within:border-cyan-700 ${
          isFocused ? "bg-cyan-700 outline-2" : ""
        }`}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            if (!isFocused) setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          className="my-auto p-0.5 pl-4 w-full h-9 text-[13px] text-white bg-transparent focus:outline-0"
          placeholder="" // we use custom placeholder below
        />

        {/* Animated placeholder */}
        <p
          className={`px-2 absolute text-gray-200 select-none pointer-events-none font-mono transition-all duration-500 bg-cyan-900 rounded-full ${placeholderClass} ${
            isFocused ? "bg-cyan-700" : ""
          }`}
        >
          What are you looking for ?
        </p>

        {/* Search icon button (could be a submit or clear) */}
        <div className="size-10 bg-cyan-600 rounded-full m-0.5 hover:scale-110 hover:rotate-90 duration-300 cursor-pointer">
          {HeaderSVGs.Search}
        </div>
      </div>
      {/* Dropdown results */}
      {isFocused && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-cyan-800 border border-cyan-700 rounded-xl shadow-lg max-h-fit scroll-hidden">
          {results.map((coin) => (
            <div
              key={coin.id}
              onClick={() => handleSelect(coin)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-700 cursor-pointer transition-colors"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.src = `/${coin.name}.png`; // your fallback
                }}
              />
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">
                  {coin.name}
                </span>
                <span className="text-cyan-300 text-xs uppercase">
                  {coin.symbol}
                </span>
              </div>
              {/* Optionally show price or rank */}
              {coin.market_cap_rank && (
                <span className="ml-auto text-gray-400 text-xs">
                  #{coin.market_cap_rank}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {/* No results message (optional) */}
      {isFocused && inputVal.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-cyan-800 border border-cyan-700 rounded-xl shadow-lg z-50 p-4 text-gray-300 text-sm">
          No results found.
        </div>
      )}
    </div>
  );
}

export default Searchbar;
