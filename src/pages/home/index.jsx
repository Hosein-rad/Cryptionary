import { useCallback, useState, useRef, useEffect } from "react";
import Hero from "./Hero";
import Boxes from "./Boxes";
import CoinsList from "./CoinsList";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const contentRef = useRef(null);

  const handleDataReady = useCallback(() => {
    setDataReady(true);
  }, []);

  useEffect(() => {
    if (!dataReady || !contentRef.current) return;

    const delayTimer = setTimeout(() => {
      const images = contentRef.current.querySelectorAll("img");
      const totalImages = images.length;

      if (totalImages === 0) {
        setIsLoading(false);
        return;
      }

      let loadedCount = 0;

      const onImageComplete = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          setIsLoading(false);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          onImageComplete();
        } else {
          img.addEventListener("load", onImageComplete, { once: true });
          img.addEventListener("error", onImageComplete, { once: true });
        }
      });

      const safetyTimer = setTimeout(() => {
        setIsLoading(false);
      }, 50);

      return () => clearTimeout(safetyTimer);
    }, 50);

    return () => clearTimeout(delayTimer);
  }, [dataReady]);

  return (
    <div className="w-dvw h-full border-0 rounded-2xl">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0C2A43] z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-lg font-semibold">
              Loading Cryptionary...
            </p>
          </div>
        </div>
      )}

      {/* Main content – rendered but invisible until everything is ready */}
      <div
        ref={contentRef}
        className={
          isLoading
            ? "opacity-30"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <Hero />
        <Boxes />
        {/* Pass the callback – CoinsList should call it after the first fetch + a tiny setTimeout to allow SVG render */}
        <CoinsList onLoaded={handleDataReady} />
      </div>
    </div>
  );
}

export default Home;
