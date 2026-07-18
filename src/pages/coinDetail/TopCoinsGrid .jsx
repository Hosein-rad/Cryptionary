import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CometCard } from "../../components/ui/comet-card";
import Sparkline from "../Home/Sparkline";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});

function TopCoinsGrid() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y"
      );
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            "Too many requests – we're on CoinGecko's free plan. Please wait 30–60 seconds and try again."
          );
        }
        if (res.status >= 500) {
          throw new Error("CoinGecko server error. Please try again later.");
        }
        throw new Error(
          `Unexpected error (status ${res.status}). Try refreshing.`
        );
      }
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        setError("Network error – check your internet connection.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-20">Loading top coins…</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 px-4">
        <p className="text-red-400 text-lg text-center mb-4">{error}</p>
        <button
          onClick={fetchCoins}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-semibold transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-h-screen overflow-y-auto px-4 bg-cyan-600">
      <div className="flex flex-wrap justify-center gap-6 p-10 pb-20">
        {coins.map((coin) => (
          <CometCard key={coin.id}>
            <button
              type="button"
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="flex w-fit cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 hover:saturate-100 transition-all duration-300 hover:scale-105 md:p-4"
              aria-label={`View ${coin.name}`}
            >
              {/* Coin Image */}
              <div className="mx-2 flex-1">
                <div className="relative mt-2 w-full aspect-[4/3]">
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-contain"
                    alt={coin.name}
                    src={coin.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/cryptionary-icon.png";
                    }}
                  />
                </div>
              </div>

              {/* Coin Info */}
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-sm font-bold">
                  {coin.name}{" "}
                  <span className="text-gray-300 opacity-50 text-xs">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-300 opacity-50">
                  #{coin.market_cap_rank}
                </div>
              </div>

              {/* Price */}
              <div className="px-4 pb-2 text-center text-sm text-gray-300">
                ${coin.current_price?.toLocaleString()}
              </div>

              {/* Tiny Sparkline */}
              <div className="px-2 pb-2 flex justify-center">
                <Sparkline
                  currentPrice={coin.current_price}
                  percentChanges={{
                    percent_change_1y:
                      coin.price_change_percentage_1y_in_currency,
                    percent_change_200d:
                      coin.price_change_percentage_200d_in_currency,
                    percent_change_30d:
                      coin.price_change_percentage_30d_in_currency,
                    percent_change_14d:
                      coin.price_change_percentage_14d_in_currency,
                    percent_change_7d:
                      coin.price_change_percentage_7d_in_currency,
                    percent_change_24h:
                      coin.price_change_percentage_24h_in_currency,
                  }}
                />
              </div>
            </button>
          </CometCard>
        ))}
      </div>
    </div>
  );
}

export default TopCoinsGrid;
