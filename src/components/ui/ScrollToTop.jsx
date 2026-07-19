// components/ScrollToTop.jsx
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [show, setShow] = useState(false);

  // detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 2 * window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // manage enter/exit animations
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // small delay to let DOM mount before starting animation
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      // wait for exit animation to finish (200ms) then unmount
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* animations */}
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        @keyframes popOut {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(0); opacity: 0; }
        }
        .animate-pop-in {
          animation: popIn 0.3s ease-out forwards;
        }
        .animate-pop-out {
          animation: popOut 0.2s ease-in forwards;
        }
      `}</style>

      {/* wrapper for tooltip positioning */}
      <div className="group fixed bottom-6 right-6 z-50">
        {/* tooltip */}
        <span className="pointer-events-none absolute bottom-full right-0 mb-2 w-max rounded bg-white/70 px-2 py-1 text-xs text-black text-center font-extrabold opacity-0 transition-opacity group-hover:opacity-80">
          Back
          <br />
          to
          <br />
          top
        </span>

        <button
          onClick={scrollToTop}
          className={`p-3 rounded-full shadow-lg
            bg-cyan-600 text-white
            opacity-50 hover:opacity-90
            hover:scale-110 transition-transform duration-200
            cursor-pointer
            ${show ? "animate-pop-in" : "animate-pop-out"}`}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
