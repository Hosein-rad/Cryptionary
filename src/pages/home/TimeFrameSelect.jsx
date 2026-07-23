import { useState, useRef, useEffect } from "react";

const options = [
  { value: "15m", label: "15m" },
  { value: "30m", label: "30m" },
  { value: "1h", label: "1h" },
  { value: "6h", label: "6h" },
  { value: "12h", label: "12h" },
  { value: "24h", label: "1d" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "1mo" },
  { value: "1y", label: "1y" },
];

export default function TimeframeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={containerRef} className="relative w-1/2">
      {/* Main button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2 lg:px-4 md:py-1 lg:py-2.5 
                   bg-cyan-900 border border-cyan-700 
                   text-white text-base md:text-md font-bold text-center
                   rounded-xl shadow-md
                   hover:bg-cyan-800 hover:border-cyan-500
                   focus:outline-none focus:ring-2 focus:ring-cyan-400
                   transition-all duration-200"
      >
        <span className="mx-auto">{selectedOption.label}</span>
        {/* up and down icon */}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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

      {/* Dropdown options */}
      {open && (
        <div className="absolute z-30 mt-1 w-full bg-cyan-900 border border-cyan-700 rounded-xl shadow-xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-white hover:bg-cyan-700 transition-colors text-base md:text-lg font-bold text-center
                ${opt.value === value ? "bg-cyan-800 text-cyan-300" : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
