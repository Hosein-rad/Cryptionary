import { useEffect, useState, useMemo } from "react";
import CurrencyItem from "./CurrencyItem.jsx";
import MetaData from "../../data/MetaDataof2kCoins.json";
import offlineData from "../../data/CoinPaprika-Top2k.json";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 5,
});

function Losers() {
  const [timeframe, setTimeframe] = useState("15m");
  const [fullData, setFullData] = useState(offlineData);

  useEffect(() => {
    let cancelled = false;
    async function fetchLive() {
      try {
        const res = await fetch("https://api.coinpaprika.com/v1/tickers");
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setFullData(data);
      } catch (err) {
        console.warn("Live losers fetch failed – using offline data.", err);
      }
    }
    fetchLive();
    return () => {
      cancelled = true;
    };
  }, []);

  const losersArray = useMemo(() => {
    const sorted = [...fullData].sort(
      (a, b) =>
        a.quotes.USD[`percent_change_${timeframe}`] -
        b.quotes.USD[`percent_change_${timeframe}`]
    );
    return sorted.slice(0, 7);
  }, [fullData, timeframe]);

  return (
    <>
      <div className="mb-3 pb-3 grid grid-cols-2 border-b-2">
        <p className="px-2 text-end text-xl">In the past ⮕</p>
        <select
          name="timeframe"
          onChange={(e) => setTimeframe(e.target.value)}
          className="w-1/2 font-bold text-center text-blue-700 border-1 rounded-xl hover:bg-white cursor-pointer duration-300 outline-none"
        >
          <option value="15m">15 minutes</option>
          <option value="30m">30 minutes</option>
          <option value="1h">1 hour</option>
          <option value="6h">6 hours</option>
          <option value="12h">12 hours</option>
          <option value="24h">24 hours</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
          <option value="1y">1 year</option>
        </select>
      </div>
      {losersArray.map((item, index) => (
        <CurrencyItem
          key={item.id || `${item.symbol}-${index}`}
          id_={MetaData[item.symbol]?.id}
          url={MetaData[item.symbol]?.url}
          rank={item.rank}
          symbol={item.symbol}
          name={item.name}
          price={formatter.format(item.quotes.USD.price)}
          changePercent={item.quotes.USD[
            `percent_change_${timeframe}`
          ]?.toFixed(2)}
        />
      ))}
    </>
  );
}

export default Losers;
