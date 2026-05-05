import { useEffect, useState } from "react";
import SortedArray from "./SortCoinsByPriceChange";
import CurrencyItem from "./CurrencyItem.jsx";
import MetaData from "../../../data/MetaDataof2kCoins.json";

function Losers() {
  const [timeframe, setTimeframe] = useState("15m");
  const [losersArray, setLosersArray] = useState([]);

  useEffect(() => {
    const sortedArr = SortedArray(timeframe);
    setLosersArray([]);
    for (let x = 1; x < 8; x++) {
      setLosersArray((c) => [...c, sortedArr[sortedArr.length - x]]);
    }
  }, [timeframe]);

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
      {losersArray.map((item) => (
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

export default Losers;
