import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sparkline from "./Sparkline";
import offlineData from "../../data/CoinGeckoMarket.json";
import useWatchlist from "../../hooks/useWatchlist/useWatchlist";

const COINS_PER_PAGE = 250;

function CoinsList({ onLoaded }) {
  const [page, setPage] = useState(0);
  const [fullData, setFullData] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const { toggleCoin, isWatched } = useWatchlist();
  const [loading, setLoading] = useState(false);
  const [offlineUsed, setOfflineUsed] = useState(false);
  const hasCalledLoaded = useRef(false);
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });

  const fetchPage = useCallback(
    async (pageNum) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_PER_PAGE}&page=${pageNum}&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y`
        );
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();

        setFullData((prev) => {
          if (pageNum === 1) {
            return data;
          }

          const ids = new Set(prev.map((c) => c.id));
          return [...prev, ...data.filter((c) => !ids.has(c.id))];
        });

        setTimeout(() => {
          if (!hasCalledLoaded.current) {
            onLoaded?.();
            hasCalledLoaded.current = true;
          }
        }, 0);
      } catch (err) {
        console.error("CoinGecko fetch failed:", err);

        if (pageNum === 1 && !offlineUsed) {
          setFullData(offlineData);
          setOfflineUsed(true);
          setTimeout(() => {
            if (!hasCalledLoaded.current) {
              onLoaded?.();
              hasCalledLoaded.current = true;
            }
          }, 0);
        }
      } finally {
        setLoading(false);
      }
    },
    [offlineUsed, onLoaded]
  );

  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, []);

  const handleAdd250 = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: "url('/coinsList-bg.webp')",
        backgroundPosition: "center",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        width: "100%",
      }}
    >
      <table className="relative w-full">
        <thead className="sticky top-16 z-20">
          <tr className="w-full h-10 text-md bg-blue-200 cursor-default">
            <th className="w-[4%]"></th>
            <th className="w-[5%]">Rank</th>
            <th className="w-[12%]">Coin</th>
            <th className="w-[10%]">Price ($)</th>
            <th className="w-[7%]">1h (%)</th>
            <th className="w-[7%]">24h (%)</th>
            <th className="w-[7%]">7d (%)</th>
            <th className="w-[13%]">Volume (24h)</th>
            <th className="w-[12%]">Market Cap</th>
            <th className="w-[15%]">1 year overview</th>
          </tr>
        </thead>
        <tbody>
          {fullData.map((item) => {
            const shortName =
              item.name.length > 14 ? item.name.slice(0, 14) + "…" : item.name;

            return (
              <tr
                key={item.id}
                className="text-sm text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 cursor-pointer"
                onClick={() => navigate(`/coin/${item.id}`)}
              >
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCoin(item.id);
                  }}
                  className="text-center text-amber-300 cursor-copy hover:scale-120"
                >
                  {isWatched(item.id) ? "★" : "☆"}
                </td>

                <td className="text-center font-medium underline">
                  {item.market_cap_rank}
                </td>

                <td className="h-full ml-1">
                  <img
                    src={item.image || "/cryptionary-icon.png"}
                    loading="lazy"
                    alt={item.symbol}
                    className="mr-2 rounded-full size-6 inline"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/cryptionary-icon.png";
                    }}
                  />
                  <span className="font-bold inline">{shortName}</span>
                </td>

                <td className="text-center font-bold">
                  ${formatter.format(item.current_price)}
                </td>

                <td className="text-center">
                  {item.price_change_percentage_1h_in_currency != null
                    ? item.price_change_percentage_1h_in_currency.toFixed(1) +
                      "%"
                    : "–"}
                </td>

                <td className="text-center">
                  {item.price_change_percentage_24h_in_currency != null
                    ? item.price_change_percentage_24h_in_currency.toFixed(1) +
                      "%"
                    : "–"}
                </td>

                <td className="text-center">
                  {item.price_change_percentage_7d_in_currency != null
                    ? item.price_change_percentage_7d_in_currency.toFixed(1) +
                      "%"
                    : "–"}
                </td>

                <td className="text-center font-medium">
                  ${formatter.format(item.total_volume)}
                </td>

                <td className="text-center font-medium">
                  ${formatter.format(item.market_cap)}
                </td>

                <td className="text-center">
                  <Sparkline
                    currentPrice={item.current_price}
                    percentChanges={{
                      percent_change_1y:
                        item.price_change_percentage_1y_in_currency,
                      percent_change_200d:
                        item.price_change_percentage_200d_in_currency,
                      percent_change_30d:
                        item.price_change_percentage_30d_in_currency,
                      percent_change_14d:
                        item.price_change_percentage_14d_in_currency,
                      percent_change_7d:
                        item.price_change_percentage_7d_in_currency,
                      percent_change_24h:
                        item.price_change_percentage_24h_in_currency,
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex my-5 gap-10">
        <button
          onClick={handleAdd250}
          disabled={loading}
          className="py-1 px-2 text-white bg-gray-800 font-bold border-2 rounded-xl cursor-pointer hover:bg-white hover:text-black duration-300 disabled:opacity-50"
        >
          {loading ? "Loading…" : "Add 250"}
        </button>
      </div>
    </div>
  );
}

export default CoinsList;
