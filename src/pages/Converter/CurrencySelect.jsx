import { useState, useRef, useEffect } from "react";

export default function CurrencySelect({ value, onChange, currencies }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = currencies.find((c) => c.id === value);

  const filtered = search.trim()
    ? currencies.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : currencies;

  const results = filtered.slice(0, 5); 

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm cursor-pointer"
      >
        <span className="flex items-center gap-2">
          {selected?.type === "crypto" && selected?.image && (
            <img src={selected.image} alt="" className="w-4 h-4 rounded-full" />
          )}
          {selected?.symbol?.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-t-lg border-b border-gray-600 outline-none text-sm"
            autoFocus
          />
          <ul className="max-h-40 overflow-y-auto">
            {results.map((cur) => (
              <li
                key={cur.id + "-Convert"}
                onClick={() => {
                  onChange(cur.id);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm text-white"
              >
                {cur.type === "crypto" && cur.image && (
                  <img
                    src={cur.image}
                    alt=""
                    className="w-4 h-4 rounded-full"
                  />
                )}
                <span className="font-medium">{cur.symbol.toUpperCase()}</span>
                <span className="text-gray-400 text-xs ml-auto truncate">
                  {cur.name}
                </span>
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-3 py-2 text-gray-400 text-sm">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
