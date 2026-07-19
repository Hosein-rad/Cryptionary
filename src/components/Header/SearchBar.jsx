"use client";

import { useState, useRef, useEffect } from "react";
import { HeaderSVGs } from "./HeaderSVGs";
import { useNavigate } from "react-router-dom";

function Searchbar({ coins = [] }) {
  const [inputVal, setInputVal] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Filter results
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

  // Close dropdown on outside click
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
    navigate(`/coin/${coin.id}`);
    setInputVal("");
    setIsFocused(false);
  };

  const isActive = isFocused || isHovered || inputVal.length > 0;

  // Placeholder letters
  const placeholderText = "Search something...";
  const letters = placeholderText.split("");

  // Width classes – smooth transition
  const widthClass = isActive ? "w-100" : "w-70";

  return (
    <div
      ref={containerRef}
      className={`relative ${widthClass} m-1 overflow-y-visible z-101 transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow layer – rotating shadow with smooth opacity */}
      <div
        className={`
          absolute inset-0 rounded-full pointer-events-none
          transition-opacity duration-300
          ${isFocused ? "opacity-100" : "opacity-0"}
          ${isFocused ? "animate-rotate-shadow" : ""}
        `}
      />

      {/* Main input wrapper */}
      <div
        className={`
          relative flex items-center rounded-full
          bg-cyan-800 transition-all duration-300
        `}
      >
        {/* Input field with inset shadow */}
        <input
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            if (!isFocused) setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          className="
            mx-2 my-0.5
            w-full h-9 pl-4 pr-0 py-0
            text-[13px] text-white
            bg-cyan-950
            outline-0
            transition-all duration-300
            shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)]
            rounded-full
          "
        />

        {/* Animated label with letter‑by‑letter stagger */}
        <label
          className={`
            absolute left-4 top-1/2 -translate-y-1/2
            pointer-events-none select-none
            transition-all duration-500
            ${isActive ? "opacity-70" : "opacity-100"}
          `}
        >
          {letters.map((char, index) => (
            <span
              key={index}
              style={{ transitionDelay: `${index * 20}ms` }}
              className={`
                inline-block min-w-[5px] text-white/80 text-center
                transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                ${
                  isActive
                    ? "text-cyan-300 -translate-y-5 scale-80"
                    : "translate-y-0 scale-100"
                }
              `}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </label>
      </div>

      {/* Dropdown results – width auto‑follows container */}
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
                  e.target.src = `/${coin.name}.png`;
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
              {coin.market_cap_rank && (
                <span className="ml-auto text-gray-400 text-xs">
                  #{coin.market_cap_rank}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {isFocused && inputVal.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-cyan-800 border border-cyan-700 rounded-xl shadow-lg p-4 text-gray-300 text-sm">
          No results found.
        </div>
      )}
    </div>
  );
}

export default Searchbar;
