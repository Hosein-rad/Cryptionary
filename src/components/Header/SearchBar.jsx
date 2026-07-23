"use client";

import { useState, useRef, useEffect } from "react";
import { HeaderSVGs } from "./HeaderSVGs";
import { useNavigate } from "react-router-dom";
import allNames from "../../data/coinGecko-allNames.json";

function Searchbar({ coins = [] }) {
  const [inputVal, setInputVal] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null); // reference for the input (used by magnifying glass button)
  const navigate = useNavigate();

  // 🟢 NEW: Populate default suggestions on focus with empty input
  useEffect(() => {
    if (isFocused && inputVal.trim().length === 0) {
      // Show first 5 coins from the live market data as quick picks
      setResults(coins.slice(0, 5));
    } else {
      // Normal filtering logic
      filterResults();
    }
  }, [isFocused, inputVal, coins]);

  // Filter results: first from live coins, then fallback to allNames
  const filterResults = () => {
    if (inputVal.trim().length === 0) {
      setResults([]);
      return;
    }
    const query = inputVal.toLowerCase();
    const filteredCoins = coins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      )
      .slice(0, 10);

    if (filteredCoins.length > 0) {
      setResults(filteredCoins);
    } else {
      // Fallback to the global coin list (allNames)
      const filteredAll = allNames
        .filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.symbol.toLowerCase().includes(query)
        )
        .slice(0, 10);
      setResults(filteredAll);
    }
  };

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

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isActive ? "w-50 sm:w-100 xl:w-130" : "w-40 sm:w-70 xl:w-100"
      } overflow-y-visible z-101 transition-all duration-300`}
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
          ref={inputRef} // 🟢 NEW: attach ref for focusing via button
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            if (!isFocused) setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          className="
            mx-2 my-0.5
            w-full h-9 pl-4 pr-12 py-0     /* 🟢 increased right padding to make room for the button */
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
          {"Search something...".split("").map((char, index) => (
            <span
              key={index}
              style={{ transitionDelay: `${index * 20}ms` }}
              className={`
                inline-block min-w-[5px] text-white/80 text-center text-xs sm:text-lg
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
              {/* 🟢 Handle missing image gracefully (fallback to a generic icon) */}
              <img
                src={coin.image || coin.thumb || "/cryptionary-icon.png"}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/cryptionary-icon.png";
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
