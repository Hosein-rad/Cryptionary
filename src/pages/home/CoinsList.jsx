import { useEffect, useState, useCallback } from "react";
import MiniChart from "./MiniChart";
import { useNavigate } from "react-router-dom";
import Sparkline from "./Sparkline";
import coinsData from "../../data/CoinGeckoMarket.json";

const COINS_PER_PAGE = 250;

function CoinsList() {
  const [page, setPage] = useState(1); // number of loaded pages (250 coins each)
  const [fullData, setFullData] = useState(coinsData); // all loaded coins
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch a single API page
  const fetchPage = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_PER_PAGE}&page=${pageNum}&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y`
      );
      const data = await res.json();
      setFullData((prev) => {
        // avoid duplicates by id
        const ids = new Set(prev.map((c) => c.id));
        return [...prev, ...data.filter((c) => !ids.has(c.id))];
      });
      console.log("fetched", fullData);
    } catch (err) {
      console.error("CoinGecko fetch failed:", err);
      const offlineData = coinsData;
      setFullData((prev) => {
        // avoid duplicates by id
        const ids = new Set(prev.map((c) => c.id));
        return [...prev, ...offlineData.filter((c) => !ids.has(c.id))];
      });
      console.log("NOT fetched", fullData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load: first page
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // Load more pages when the user clicks "Add 250"
  const handleAdd250 = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  };

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage:
          "url('https://ghab24.com/movafaghiat/media/appmedia/image/GHAB%20MEDIA%20DESKTOP%201025-min.jpg')",
        backgroundPosition: "center",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        width: "100%",
      }}
    >
      <table className="w-full">
        <thead className="sticky top-16">
          <tr className="w-full h-7 text-sm bg-blue-200 cursor-default">
            <th className="w-[4%]"></th>
            <th className="w-[5%]">Rank</th>
            <th className="w-[12%]">Coin</th>
            <th className="w-[10%]">Price ($)</th>
            <th className="w-[7%]">1h (%)</th>
            <th className="w-[7%]">24h (%)</th>
            <th className="w-[7%]">7d (%)</th>
            <th className="w-[13%]">Volume (24h)</th>
            <th className="w-[12%]">Market Cap</th>
            <th className="w-[15%]">1year overview</th>
          </tr>
        </thead>
        <tbody>
          {fullData.map((item) => {
            const isFav = favorites.includes(item.id);
            const shortName =
              item.name.length > 14 ? item.name.slice(0, 14) + "…" : item.name;

            return (
              <tr
                key={item.id}
                className="text-[12px] text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 cursor-pointer"
                onClick={() => navigate(`/coin/${item.id}`)}
              >
                {/* Favourite star */}
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="text-center text-amber-300 cursor-copy hover:scale-120"
                >
                  {isFav ? "★" : "☆"}
                </td>

                <td className="text-center font-medium underline">
                  {item.market_cap_rank}
                </td>

                <td className="h-full ml-1">
                  <img
                    src={item.image}
                    alt={item.symbol}
                    className="mr-2 rounded-full size-6 inline"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-shadow-cyan-300 font-bold text-shadow-xs inline">
                    {shortName}
                  </span>
                </td>

                <td className="text-center font-bold">
                  ${item.current_price?.toLocaleString()}
                </td>

                <td className="text-center">
                  {item.price_change_percentage_1h_in_currency?.toFixed(1) ??
                    "–"}
                  %
                </td>

                <td className="text-center">
                  {item.price_change_percentage_24h_in_currency?.toFixed(1) ??
                    "–"}
                  %
                </td>

                <td className="text-center">
                  {item.price_change_percentage_7d_in_currency?.toFixed(1) ??
                    "–"}
                  %
                </td>

                <td className="text-center font-medium">
                  ${item.total_volume?.toLocaleString()}
                </td>

                <td className="text-center font-medium">
                  ${item.market_cap?.toLocaleString()}
                </td>

                <td className="text-center">
                  {/* <MiniChart
                    currentPrice={item.current_price}
                    percentChange24h={
                      item.price_change_percentage_24h_in_currency
                    }
                  /> */}
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

      {/* Pagination */}
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
