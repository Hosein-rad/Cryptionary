import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChartCol from "./ChartCol";
import DetailsCol from "./detailsCol";
import TopCoinsGrid from "./TopCoinsGrid ";
import { SVGs } from "./SVGs";
import allNames from "../../data/coinGecko-allNames.json"; // 🟢 import the full coin list

// ------------------------------------------------------------
//  HELPER: find the best matching coin ID (original → -2 → -3 → … → -5)
// ------------------------------------------------------------
function findBestCoinId(baseId, list) {
  if (!baseId) return null;
  // check the exact id first
  if (list.find((c) => c.id === baseId)) return baseId;
  // try suffixes -2 to -5
  for (let i = 2; i <= 5; i++) {
    const candidate = `${baseId}-${i}`;
    if (list.find((c) => c.id === candidate)) return candidate;
  }
  return null; // set something to handle the null later
}

export default function CoinDetail() {
  const navigate = useNavigate();
  const { coinId: baseCoinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const loadedIdRef = useRef(null);

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const formatter2 = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 5,
  });

  // ------------------------------------------------------------
  //  FIND THE CORRECT COIN ID (using the offline list)
  // ------------------------------------------------------------
  const effectiveCoinId = useMemo(
    () => findBestCoinId(baseCoinId, allNames),
    [baseCoinId]
  );

  // ------------------------------------------------------------
  //  IF A DIFFERENT (BETTER) ID WAS FOUND, UPDATE THE URL SILENTLY
  // ------------------------------------------------------------
  useEffect(() => {
    if (effectiveCoinId && effectiveCoinId !== baseCoinId) {
      navigate(`/coin/${effectiveCoinId}`, { replace: true });
    }
  }, [effectiveCoinId, baseCoinId, navigate]);

  // ------------------------------------------------------------
  //  RESET WHEN THE URL (baseCoinId) CHANGES
  // ------------------------------------------------------------
  useEffect(() => {
    setCoinData(null);
    setChartData(null);
    setError(null);
    loadedIdRef.current = null;
  }, [baseCoinId]);

  // ------------------------------------------------------------
  //  FETCH DATA (only if a valid ID exists)
  // ------------------------------------------------------------
  const fetchData = useCallback(
    async (signal) => {
      if (!effectiveCoinId) {
        setError("Coin not found – please check the name or try another one.");
        return;
      }

      setCoinData(null);
      setChartData(null);
      setError(null);

      try {
        const coinRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${effectiveCoinId}`,
          { signal }
        );
        if (!coinRes.ok) {
          throw new Error(`Coin data error: ${coinRes.status}`);
        }
        const coinJson = await coinRes.json();
        setCoinData(coinJson);

        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${effectiveCoinId}/market_chart?vs_currency=usd&days=1`,
          { signal }
        );
        if (!chartRes.ok) {
          throw new Error(`Chart data error: ${chartRes.status}`);
        }
        setChartData(await chartRes.json());

        loadedIdRef.current = effectiveCoinId;
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    },
    [effectiveCoinId]
  );

  // ------------------------------------------------------------
  //  TRIGGER FETCH WHEN effectiveCoinId CHANGES
  // ------------------------------------------------------------
  useEffect(() => {
    if (!effectiveCoinId) return;
    if (effectiveCoinId === loadedIdRef.current) return;

    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [effectiveCoinId, fetchData]);

  // ------------------------------------------------------------
  //  NO MORE SUFFIX-RETRY LOGIC – WE ALREADY HAVE THE RIGHT ID
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  //  RENDER
  // ------------------------------------------------------------
  return (
    <div className="relative w-full h-fit sm:h-[calc(100vh-60px)] flex flex-col sm:flex-row justify-evenly text-white sm:overflow-hidden">
      {!baseCoinId && (
        <div>
          <p className="mt-8 text-center text-2xl font-extrabold">
            Looking for a specific coin?
          </p>
          <p className="my-5 text-center text-lg">
            👆 Use the search bar, or click a card to get started 👇
          </p>
          <TopCoinsGrid />
        </div>
      )}

      {baseCoinId && !effectiveCoinId && !coinData && (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-red-400">
            Coin not found – please check the name or try another one.
          </p>
        </div>
      )}

      {baseCoinId && effectiveCoinId && !coinData && (
        <div>
          Loading…
          {SVGs.loading}
        </div>
      )}

      {baseCoinId && coinData && <DetailsCol coinData={coinData} />}
      {baseCoinId && chartData && (
        <div className="sm:w-2/3 h-full px-5 pb-15 flex flex-col overflow-y-scroll">
          <ChartCol chartData={chartData} />
        </div>
      )}

      {/* Error overlay (if needed) */}
      {error && (
        <div className="absolute h-dvh w-dvw inset-0 flex flex-col items-center justify-center backdrop-blur-3xl text-black rounded-2xl text-xl font-extrabold">
          <p className="text-4xl">{error}</p>
          <p className="text-center mt-10 text-white">
            We are using free api plans from CoinGecko and CoinPaprika. <br />
            Wait a few seconds before trying again...
          </p>
          <button
            className="px-4 py-2 my-5 bg-purple-300 text-black rounded-2xl cursor-pointer"
            onClick={() => {
              const controller = new AbortController();
              fetchData(controller.signal);
            }}
          >
            Retry
          </button>
          <div className="size-50 text-purple-800">{SVGs.loading}</div>
        </div>
      )}
    </div>
  );
}
