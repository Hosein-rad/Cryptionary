import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import CurrencyItem from "./CurrencyItem.jsx";
import MetaData from "../../data/MetaDataof2kCoins.json";
import offlineData from "../../data/CoinPaprika-Top2k.json";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 5,
});

const fetchTickers = async () => {
  const res = await fetch("https://api.coinpaprika.com/v1/tickers");
  if (!res.ok) throw new Error(`Status: ${res.status}`);
  return res.json();
};

function Gainers() {
  const [timeframe, setTimeframe] = useState("15m");

  const { data: fullData = offlineData } = useQuery({
    queryKey: ["tickers"],
    queryFn: fetchTickers,
    initialData: offlineData,
    staleTime: 60000,
  });

  const gainersArray = useMemo(() => {
    const sorted = [...fullData].sort(
      (a, b) =>
        b.quotes.USD[`percent_change_${timeframe}`] -
        a.quotes.USD[`percent_change_${timeframe}`]
    );
    return sorted.slice(0, 7);
  }, [fullData, timeframe]);

  return (
    <>
      <div className="mb-3 pb-3 grid grid-cols-2 border-b-2">
        <p className="px-2 text-end text-xl">In the past ⮕</p>
        <select
          className="w-1/2 font-bold text-center text-blue-700 border-1 rounded-xl hover:bg-white cursor-pointer duration-300 outline-none"
          name="timeframe"
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="15m">15 minutes</option>
          <option value="30m" className="bg-blue-100">
            30 minutes
          </option>
          <option value="1h">1 hour</option>
          <option value="6h" className="bg-blue-100">
            6 hours
          </option>
          <option value="12h">12 hours</option>
          <option value="24h" className="bg-blue-100">
            24 hours
          </option>
          <option value="7d">7 days</option>
          <option value="30d" className="bg-blue-100">
            30 days
          </option>
          <option value="1y">1 year</option>
        </select>
      </div>
      {gainersArray.map((item, index) => (
        <CurrencyItem
          key={item.id || `${item.symbol}-${index}`}
          url={MetaData[item?.symbol]?.url}
          id_={MetaData[item.symbol]?.id}
          rank={item.rank}
          symbol={item.symbol}
          name={item.name}
          price={formatter.format(item.quotes.USD.price)}
          changePercent={item.quotes.USD[`percent_change_${timeframe}`].toFixed(
            2
          )}
        />
      ))}
    </>
  );
}

export default Gainers;
