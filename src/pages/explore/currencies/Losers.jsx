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
      <select name="timeframe" onChange={(e) => setTimeframe(e.target.value)}>
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
      {losersArray.map((item) => (
        <CurrencyItem
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
