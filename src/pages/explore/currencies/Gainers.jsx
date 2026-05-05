import { useEffect, useState } from "react";
import SortedArray from "./SortCoinsByPriceChange";
import CurrencyItem from "./CurrencyItem.jsx";
import MetaData from "../../../data/MetaDataof2kCoins.json";

function Gainers() {
  const [timeframe, setTimeframe] = useState("15m");
  const [gainersArray, setGainersArray] = useState([]);

  useEffect(() => {
    const sortedArr = SortedArray(timeframe);
    setGainersArray([]);

    for (let x = 0; x < 7; x++) {
      setGainersArray((c) => [...c, sortedArr[x]]);
    }
  }, [timeframe]);

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
      {gainersArray.map((item) => (
        <CurrencyItem
          key={crypto.randomUUID()}
          url={MetaData[item?.symbol]?.url}
          rank={item.rank}
          symbol={item.symbol}
          price={item.quotes.USD.price}
          changePercent={item.quotes.USD[`percent_change_${timeframe}`]}
        />
      ))}
    </>
  );
}

export default Gainers;
