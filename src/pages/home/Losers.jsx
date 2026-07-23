import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import CurrencyItem from "./CurrencyItem.jsx";
import MetaData from "../../data/MetaDataof2kCoins.json";
import offlineData from "../../data/CoinPaprika-Top2k.json";
import TimeframeSelect from "./TimeFrameSelect.jsx";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 5,
});

const fetchTickers = async () => {
  const res = await fetch("https://api.coinpaprika.com/v1/tickers");
  if (!res.ok) throw new Error(`Status: ${res.status}`);
  return res.json();
};

function Losers() {
  const [timeframe, setTimeframe] = useState("15m");

  const { data: fullData = offlineData } = useQuery({
    queryKey: ["tickers"],
    queryFn: fetchTickers,
    initialData: offlineData,
    staleTime: 60000,
  });

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
        <p className="px-2 my-auto text-end text-sm md:text-md lg:text-xl">
          In the past ⮕
        </p>
        <TimeframeSelect value={timeframe} onChange={setTimeframe} />
      </div>
      {losersArray.map((item, index) => (
        <CurrencyItem
          key={item.id || `${item.symbol}-${index}`}
          url={MetaData[item?.symbol]?.url}
          id_={MetaData[item?.symbol]?.id}
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

export default Losers;
