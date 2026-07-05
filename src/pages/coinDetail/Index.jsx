import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function CoinDetail() {
  const { coinId } = useParams(); // extracts "bitcoin" from /coin/bitcoin
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  // const [rangeWidth, setRangeWidth] = useState("");
  // const ref = useRef(1);

  useEffect(() => {
    if (!coinId) return;
    if (coinData) return; // remove later
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
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`,
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

  // width of the 24h Range calculator
  // useEffect(() => {
  //   if (!coinData) return;
  //   if (!ref.current) return;
  //   const totalDiff =
  //     Number(coinData.market_data.high_24h.usd) -
  //     Number(coinData.market_data.low_24h.usd);
  //   const current =
  //     Number(coinData.market_data.current_price.usd) -
  //     Number(coinData.market_data.low_24h.usd);
  //   ref.current = Number(current / totalDiff).toFixed(1);
  //   console.log(rangeWidth);
  // }, [coinData, coinId]);
  // Calculate the bar fill percentage
  const getBarWidth = () => {
    if (!coinData?.market_data) return 0;
    const high = Number(coinData.market_data.high_24h.usd);
    const low = Number(coinData.market_data.low_24h.usd);
    const current = Number(coinData.market_data.current_price.usd);

    if (high - low === 0) return 0;
    const percent = ((current - low) / (high - low)) * 100;
    return Math.min(100, Math.max(0, percent)).toFixed(1);
  };

  const barWidth = getBarWidth();

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
      {coinId && coinData && (
        <div className="w-1/3 h-full px-5 flex flex-col items-center justify-start border-r-2 overflow-y-scroll">
          {/* icon - name - symbol - rank */}
          <div className="w-full h-fit mb-2 flex flex-row items-end justify-start">
            <img
              src={coinData.image.large}
              width={50}
              height={50}
              className="self-start size-13 rounded-full"
            />
            <p className="wrap-anywhere">
              <span className="p-2 text-3xl">{coinData.name}</span>
              <span className="text-gray-300 text-nowrap uppercase">
                {coinData.symbol}
              </span>
              <span className="py-0.5 px-1.5 mx-2 text-nowrap text-gray-300 bg-gray-700 rounded-md">
                #{coinData.market_cap_rank}
              </span>
            </p>
          </div>

          {/* price and price change % */}
          <div className="pt-3 flex">
            <p className="text-5xl">
              ${coinData.market_data.current_price.usd}
            </p>
            <div className="w-full mx-2 my-1 flex flex-row items-end justify-start text-center">
              {Number(coinData.market_data.price_change_percentage_24h) < 0 ? (
                <p className="text-red-400">
                  {Math.abs(
                    coinData.market_data.price_change_percentage_24h
                  ).toFixed(2)}
                  % ▼(24h)
                </p>
              ) : (
                <p className="text-green-300">
                  {Math.abs(
                    coinData.market_data.price_change_percentage_24h
                  ).toFixed(2)}
                  % ▲(24h)
                </p>
              )}
            </div>
          </div>

          {/* 24h Range */}
          <div className="relative my-7 w-full h-2 bg-gray-800 rounded-full">
            <div
              // ref={ref}
              className={`absolute h-2 rounded-full bg-white`}
              style={{ width: `${barWidth}%` }}
              // style={{ width: `${Number(ref.current) * 100}%` }}
            ></div>
            <div className="mt-2 flex justify-between">
              <p>${coinData.market_data.low_24h.usd}</p>
              <p>24h Range</p>
              <p>${coinData.market_data.high_24h.usd}</p>
            </div>
          </div>

          <button
            className="p-5 rounded-full bg-black"
            onClick={() => console.log(coinData)}
          >
            coin data LOG
          </button>
          <button
            className="p-5 rounded-full bg-black"
            onClick={() => console.log(chartData)}
          >
            chart data LOG
          </button>
        </div>
      )}

      {/* -------------------- COIN CHART COLUMN -------------------- */}
      {coinId && chartData && (
        <div className="w-2/3 h-full px-5 flex flex-col overflow-y-scroll"></div>
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
