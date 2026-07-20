import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Sparkline from "./Sparkline";
import offlineData from "../../data/CoinGeckoMarket.json";
import useWatchlist from "../../hooks/useWatchlist/useWatchlist";

const COINS_PER_PAGE = 250;

function CoinsList({ onLoaded }) {
  const { toggleCoin, isWatched } = useWatchlist();
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useInfiniteQuery({
      queryKey: ["coinsList"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_PER_PAGE}&page=${pageParam}&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y`
        );
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === COINS_PER_PAGE
          ? allPages.length + 1
          : undefined;
      },
      initialData: {
        pages: [offlineData],
        pageParams: [1],
      },
      staleTime: 60000,
    });

  const fullData = data?.pages?.flat() ?? [];

  const hasCalledLoaded = useRef(false);
  useEffect(() => {
    if (isSuccess && !hasCalledLoaded.current) {
      onLoaded?.();
      hasCalledLoaded.current = true;
    }
  }, [isSuccess, onLoaded]);

  const handleAdd250 = () => {
    fetchNextPage();
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full flex-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
        <table className="w-full">
          <thead className="sticky top-0 z-20">
            <tr className="w-full h-10 text-md bg-blue-200 cursor-default">
              <th className="w-[4%]"></th>
              <th className="w-[5%]">Rank</th>
              <th className="w-[12%]">Coin</th>
              <th className="w-[10%]">Price$</th>
              <th className="w-[7%]">1H%</th>
              <th className="w-[7%]">24H%</th>
              <th className="w-[7%]">7D%</th>
              <th className="w-[13%]">Volume24H</th>
              <th className="w-[12%]">MarketCap</th>
              <th className="w-[15%]">1Y overview</th>
            </tr>
          </thead>
          <tbody className="bg-black/50">
            {fullData.map((item) => {
              const shortName =
                item.name.length > 14
                  ? item.name.slice(0, 14) + "…"
                  : item.name;

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
                      ? item.price_change_percentage_24h_in_currency.toFixed(
                          1
                        ) + "%"
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
      </div>

      {/* Load more button – stays fixed at bottom */}
      <div className="absolute bottom-0 w-full py-2 flex items-center justify-center backdrop-blur-xs z-20">
        <button
          onClick={handleAdd250}
          disabled={isFetchingNextPage || !hasNextPage} // MODIFIED: use isFetchingNextPage, hasNextPage
          className="py-1 px-5 mx-auto text-white bg-gray-800 font-bold border-2 rounded-xl cursor-pointer hover:bg-white hover:text-black duration-300 disabled:opacity-50"
        >
          {isFetchingNextPage ? "Loading…" : "Add 250"} {/* MODIFIED */}
        </button>
      </div>
    </div>
  );
}

export default CoinsList;
