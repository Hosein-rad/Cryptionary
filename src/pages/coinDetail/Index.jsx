import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import ChartCol from "./ChartCol";
import DetailsCol from "./detailsCol";

const loadingSVG = (
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
);

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

  const fetchData = useCallback(
    async (signal) => {
      setCoinData(null);
      setChartData(null);
      setError(null);

      try {
        const coinRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          { signal }
        );
        if (!coinRes.ok) throw new Error(`Status: ${coinRes.status}`);
        setCoinData(await coinRes.json());

        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
          { signal }
        );
        if (!chartRes.ok) throw new Error(`Status: ${chartRes.status}`);
        setChartData(await chartRes.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    },
    [coinId]
  );

  useEffect(() => {
    if (!coinId) return;
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [coinId, fetchData]);

  useEffect(() => {
    if (!error) return;
    if (coinData || chartData) return; // already succeeded, don't retry

    const interval = setInterval(() => {
      const controller = new AbortController();
      fetchData(controller.signal);
    }, 5000);

    return () => clearInterval(interval);
  }, [error, coinData, chartData, fetchData]);

  return (
    <div className="relative w-full h-screen flex flex-row  justify-evenly pt-20 text-white overflow-hidden">
      {!coinId && (
        <div className="text-2xl mt-10">
          Select a coin first to see the details and charts here!
        </div>
      )}
      {coinId && !coinData && (
        <div>
          Loading…
          {loadingSVG}
        </div>
      )}

      {/* -------------------- COIN DETAILS COLUMN -------------------- */}
      {coinId && coinData && <DetailsCol coinData={coinData} />}

      {/* -------------------- COIN CHART COLUMN -------------------- */}
      {coinId && chartData && (
        <div className="w-2/3 h-full px-5 pb-15 flex flex-col overflow-y-scroll">
          <ChartCol chartData={chartData} />
        </div>
      )}

      {/* -------------------- ERROR -------------------- */}
      {error && (
        <div className="absolute h-dvh w-dvw inset-0 flex flex-col items-center justify-center backdrop-blur-3xl text-black rounded-2xl text-xl font-extrabold">
          <p className="text-4xl">{error}</p>
          <p className="text-center mt-10 text-white">
            We are using free api plans from CoinGecko and CoinPaprika. <br />
            Wait a few secons before trying again...
          </p>
          <button
            className="px-4 py-2 my-5 bg-purple-300 text-black rounded-2xl cursor-pointer"
            onClick={fetchData}
          >
            Retry
          </button>
          <div className="size-50 text-purple-800">{loadingSVG}</div>
        </div>
      )}
    </div>
  );
}
