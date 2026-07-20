import { useCallback, useState, useRef, useEffect } from "react";
import Hero from "./Hero";
import Boxes from "./Boxes";
import CoinsList from "./CoinsList";
import ScrollToTop from "../../ui/ScrollToTop";

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
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0C2A43] z-50">
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-white text-lg font-semibold">Loading...</p>
            <svg viewBox="0 0 128 64" className="text-purple-700 text-5xl">
              <style>{`
    #back2089, #front2089 {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    #back2089 {
      stroke: currentColor;
      opacity: 0.1;
    }

    #front2089 {
      stroke: currentColor;
      stroke-dasharray: 260;
      stroke-dashoffset: 0;
      animation: dash_6821 1.4s linear infinite;
    }

    @keyframes dash_6821 {
      0% {
        stroke-dashoffset: 260;
        opacity: 1;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: .5;
      }
    }
  `}</style>

              <polyline
                id="back2089"
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
              />
              <polyline
                id="front2089"
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
              />
            </svg>
          </div>
        </div>
      )}

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
        <CoinsList onLoaded={handleDataReady} />
      </div>

      <ScrollToTop />
    </div>
  );
}

export default Home;
