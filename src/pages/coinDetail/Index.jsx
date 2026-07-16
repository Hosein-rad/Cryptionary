import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ChartCol from "./ChartCol";
import DetailsCol from "./detailsCol";

export default function CoinDetail() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const formatter2 = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 5,
  });

  useEffect(() => {
    if (!coinId) return;
    // if (coinData) return; // ------- uncomment when editing : prevents constant fetches -----------
    const controller = new AbortController();

    setCoinData(null);
    setChartData(null);
    setError(null);

    // fetch one coin details
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setCoinData(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });

    // fetch chart details
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
      {
        signal: controller.signal,
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setChartData(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });

    return () => controller.abort();
  }, [coinId]);

  // error window, disappears after 5sec
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer); // cleanup on unmount or error change
  }, [error]);

  return (
    <div className="relative w-full h-screen flex flex-row  justify-evenly pt-20 bg-cyan-800 text-white overflow-hidden">
      {!coinId && <div>Did you select a Coin brov ? if not, DO IT</div>}
      {coinId && !coinData && (
        <div>
          Loading…
          <svg viewBox="0 0 128 64">
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
      )}

      {/* -------------------- COIN DETAILS COLUMN -------------------- */}
      {coinId && coinData && <DetailsCol coinData={coinData} />}

      {/* -------------------- COIN CHART COLUMN -------------------- */}
      {coinId && chartData && (
        <div className="w-2/3 h-full px-5 flex flex-col overflow-y-scroll">
          <ChartCol chartData={chartData} />
        </div>
      )}

      {/* -------------------- ERROR -------------------- */}
      {error && (
        <div className="absolute h-dvh w-dvw inset-0 flex flex-col items-center justify-center backdrop-blur-3xl text-black rounded-2xl text-xl font-extrabold">
          <p className="text-4xl">{error}</p>
          <div className="size-50 text-purple-800">
            <svg viewBox="0 0 128 64">
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
    </div>
  );
}
