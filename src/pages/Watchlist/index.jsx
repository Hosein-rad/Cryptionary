import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../../hooks/useWatchlist/useWatchlist";
import Sparkline from "../Home/Sparkline";
import MetaData from "../../data/MetaDataof2kCoins.json";
import GradientTitle from "../../ui/GradientTitle";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});

const fetchWatchlistCoins = async (watchlist) => {
  if (!watchlist.length) return [];
  const ids = watchlist.join(",");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y`
  );
  if (!res.ok) throw new Error(`Status: ${res.status}`);
  return res.json();
};

function Watchlist() {
  const navigate = useNavigate();
  const { watchlist, toggleCoin, isWatched } = useWatchlist();
  const queryClient = useQueryClient();

  const {
    data: coins = [],
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => fetchWatchlistCoins(watchlist),
    enabled: watchlist.length > 0,
    staleTime: 60000,
  });

  const handleToggle = (coinId) => {
    const wasWatched = isWatched(coinId);
    toggleCoin(coinId);

    if (!wasWatched) {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    }
  };

  if (error) {
    return (
      <div className="w-full mt-20 flex flex-col justify-center items-center h-64 text-red-400">
        Error loading watchlist: {error.message}
        <p className="text-center mt-5 text-white text-2xl">
          We are using free api plans from CoinGecko and CoinPaprika. <br />
          Wait a few seconds before trying again...
        </p>
        <button
          className="px-4 py-2 my-5 bg-purple-300 text-black rounded-2xl cursor-pointer"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!watchlist.length) {
    return (
      <div className="w-full -mt-15 sm:-mt-30 md:-mt-50 xl:-mt-10 h-[calc(100vh-100px)] flex flex-col items-center justify-center text-white text-xl">
        <p className="text-3xl md:text-5xl font-extrabold text-center">
          Your watchlist is a little empty
        </p>
        <p className="mt-5 text-lg md:text-2xl text-center">
          Star some coins to see them here
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="mt-20 w-full flex flex-col justify-center items-center h-64 text-white text-center text-2xl">
        Loading watchlist...
        <svg viewBox="0 0 128 64" className="size-50">
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
              0% { stroke-dashoffset: 260; opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: .5; }
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
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <GradientTitle
        text="Watchlist"
        className="text-[42px] md:text-8xl lg:text-[110px] xl:text-9xl my-5"
      />
      {/* <table className="w-full">
        <thead className="sticky top-0">
          <tr className="w-full h-10 text-sm bg-blue-200 cursor-default">
            <th className="w-[4%]"></th>
            <th className="w-[5%]">Rank</th>
            <th className="w-[12%]">Coin</th>
            <th className="w-[10%]">Price ($)</th>
            <th className="w-[7%]">1h (%)</th>
            <th className="w-[7%]">24h (%)</th>
            <th className="w-[7%]">7d (%)</th>
            <th className="w-[13%]">Volume (24h)</th>
            <th className="w-[12%]">Market Cap</th>
            <th className="w-[15%]">1Y Overview</th>
          </tr>
        </thead>
        <tbody className="bg-black/40">
          {coins.map((item) => {
            const shortName =
              item.name.length > 14 ? item.name.slice(0, 14) + "…" : item.name;

            return (
              <tr
                key={item.id}
                className="h-8 text-md text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 cursor-pointer"
                onClick={() => navigate(`/coin/${item.id}`)}
              >
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(item.id); // MODIFIED: use handler
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
                  <span className="text-shadow-cyan-300 font-bold text-shadow-xs inline">
                    {shortName}
                  </span>
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
      </table> */}
      <table className="w-full">
        <thead className="sticky top-0 z-20">
          <tr className="w-full h-10 text-md bg-blue-200 cursor-default">
            <th className=""></th>
            <th className="p-1 text-sm md:text-lg">Rank</th>
            <th className="p-1 text-sm md:text-lg">Coin</th>
            <th className="p-1 text-sm md:text-lg">Price$</th>
            {/* 🔽 Hide on mobile, show as table-cell on sm+ */}
            <th className="hidden sm:table-cell p-1 text-sm md:text-lg">1H%</th>
            <th className="hidden sm:table-cell p-1 text-sm md:text-lg">
              24H%
            </th>
            <th className="hidden sm:table-cell p-1 text-sm md:text-lg">7D%</th>
            <th className="hidden sm:table-cell p-1 text-sm md:text-lg">
              Volume24H
            </th>
            <th className="p-1 text-sm md:text-lg">
              Market
              <br className="block sm:hidden" />
              Cap
            </th>
            <th className="p-1 text-sm md:text-lg">
              1Y <br className="block sm:hidden" />
              overview
            </th>
          </tr>
        </thead>
        <tbody className="bg-black/50">
          {coins.map((item) => {
            return (
              <tr
                key={item.id}
                className="h-10 text-sm text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 cursor-pointer"
                onClick={() => navigate(`/coin/${item.id}`)}
              >
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCoin(item.id);
                  }}
                  className="w-6 sm:w-10 text-center text-amber-300 cursor-copy hover:scale-120"
                >
                  {isWatched(item.id) ? "★" : "☆"}
                </td>

                <td className="text-center font-medium underline">
                  {item.market_cap_rank}
                </td>

                <td className="h-10 my-auto lg:pl-10 flex flex-row items-center">
                  <img
                    src={item.image || "/cryptionary-icon.png"}
                    loading="lazy"
                    alt={item.symbol}
                    className="rounded-full size-5 sm:size-8 inline"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/cryptionary-icon.png";
                    }}
                  />
                  <span className="pl-1 md:pl-5 inline-block max-w-[80px] sm:max-w-[150px] text-sm sm:text-xl truncate font-bold">
                    {item.name}
                  </span>
                </td>

                <td className="text-center font-bold w-20 sm:w-30">
                  ${formatter.format(item.current_price)}
                </td>

                {/* 🔽 Hide these cells on mobile, show on sm+ */}
                <td className="hidden sm:table-cell text-center w-20">
                  {item.price_change_percentage_1h_in_currency != null
                    ? item.price_change_percentage_1h_in_currency.toFixed(1) +
                      "%"
                    : "–"}
                </td>

                <td className="hidden sm:table-cell text-center w-20">
                  {item.price_change_percentage_24h_in_currency != null
                    ? item.price_change_percentage_24h_in_currency.toFixed(1) +
                      "%"
                    : "–"}
                </td>

                <td className="hidden sm:table-cell text-center w-20">
                  {item.price_change_percentage_7d_in_currency != null
                    ? item.price_change_percentage_7d_in_currency.toFixed(1) +
                      "%"
                    : "–"}
                </td>

                <td className="hidden sm:table-cell text-center font-medium">
                  ${formatter.format(item.total_volume)}
                </td>

                <td className="text-center font-medium">
                  <span className="hidden sm:inline">$</span>
                  {formatter.format(item.market_cap)}
                </td>

                <td className="w-20 md:w-70 h-8 sm:h-10">
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
                    className="ml-2"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Watchlist;
