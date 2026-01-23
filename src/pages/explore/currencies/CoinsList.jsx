import { useEffect, useState } from "react";
import CoinPaprikaData from "../../../data/CoinPaprika-Top2k.json";
import MetaData from "../../../data/MetaDataof2kCoins.json";

function CoinsList() {
  const [page, setPage] = useState(1);
  const [coinsList, setCoinsList] = useState([]);
  useEffect(() => {
    setCoinsList([]);
    for (let x = 0; x < 100 * page; x++) {
      setCoinsList((c) => [...c, CoinPaprikaData[x]]);
    }
  }, [page]);
  console.log(coinsList);
  console.log(MetaData["BTC"]?.name.split(""));
  return (
    <div className="flex flex-col items-center">
      <table className="w-full mt-8">
        <thead>
          <tr className="w-full text-[12px] bg-blue-200">
            <th className="w-[2%]"></th>
            <th className="w-[5%]">#</th>
            <th className="w-[17%]">Coin</th>
            <th className="w-[10]">Price</th>
            <th className="w-[7%]">1h</th>
            <th className="w-[7%]">1d</th>
            <th className="w-[7%]">1w</th>
            <th className="w-[12%]">Volume(24h)</th>
            <th className="w-[12%]">Market Cap(24h)</th>
            <th className="w-[21%]">All Time</th>
          </tr>
        </thead>
        <tbody>
          {coinsList?.map((item) => {
            return (
              <tr className="text-[12px]">
                <td>☆</td>
                <td className="text-center">{item.rank}</td>
                <td className="flex justify-start">
                  <img
                    src={MetaData[item?.symbol]?.url}
                    className="rounded-full size-6"
                  />
                  <p>
                    {item.name.split("").length < 9
                      ? item.name
                      : item.name.slice(0, 11) + "..."}
                  </p>
                </td>
                <td>{String(item.quotes.USD.price).slice(0, 10)}</td>
                <td>{item.quotes.USD.percent_change_1h}%</td>
                <td>{item.quotes.USD.percent_change_24h}%</td>
                <td>{item.quotes.USD.percent_change_7d}%</td>
                <td>{item.quotes.USD.volume_24h}</td>
                <td>{item.quotes.USD.market_cap}</td>
              </tr>
            );
          })}
        </tbody>
        {/* <tr className="text-right text-[12px]">
          <td>☆</td>
          <td className="text-center">3</td>
          <td className="flex justify-end">
            <img
              src="https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193"
              className="rounded-full size-6"
            />
            <p>Ethereum</p>
          </td>
          <td>1.22233</td>
          <td>53.2%</td>
          <td>22.0%</td>
          <td>-21.0%</td>
          <td>$74.28B</td>
          <td>$560.01B</td>
          <td>📉</td>
        </tr> */}
      </table>
      <div className="flex gap-3">
        <button
          className="py-1 px-2 bg-gray-600 border-[1px] border-b-blue-950 rounded-2xl"
          onClick={() => setPage((c) => c + 1)}
        >
          Add 100
        </button>
        <button
          className="py-1 px-2 bg-gray-600 border-[1px] border-b-blue-950 rounded-2xl"
          onClick={() => setPage((c) => c + 3)}
        >
          Add 300
        </button>
      </div>
    </div>
  );
}

export default CoinsList;
