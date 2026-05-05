import { useEffect, useState } from "react";
import CoinPaprikaData from "../../../data/CoinPaprika-Top2k.json";
import MetaData from "../../../data/MetaDataof2kCoins.json";

function CoinsList() {
  const [page, setPage] = useState(1);
  const [favorite, setFavorite] = useState([]);
  const [coinsList, setCoinsList] = useState([]);

  useEffect(() => {
    setCoinsList([]);
    for (let x = 0; x < 100 * page; x++) {
      setCoinsList((c) => [...c, CoinPaprikaData[x]]);
    }
  }, [page]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: `url("https://ghab24.com/movafaghiat/media/appmedia/image/GHAB%20MEDIA%20DESKTOP%201025-min.jpg")`,
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
            <th className="w-[7%]">1d (%)</th>
            <th className="w-[7%]">1w (%)</th>
            <th className="w-[15%]">Volume (24h)</th>
            <th className="w-[12%]">Market Cap (24h)</th>
            {/* <th className="w-[21%]">All Time</th> */}
          </tr>
        </thead>
        <tbody>
          {coinsList?.map((item) => {
            return (
              <tr
                className="text-[12px] text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 z-50 cursor-pointer"
                key={crypto.randomUUID()}
              >
                <td
                  onClick={() =>
                    !favorite.includes(item)
                      ? setFavorite((c) => [...c, item])
                      : setFavorite((c) => c.filter((i) => i.id != item.id))
                  }
                  className="text-center text-amber-300 cursor-copy hover:scale-120"
                >
                  {favorite.includes(item) ? "★" : "☆"}
                </td>
                <td className="text-center font-medium underline">
                  {item.rank}
                </td>
                <td className="flex ml-1 items-center">
                  <img
                    src={MetaData[item?.symbol]?.url}
                    className="rounded-full size-6 mx-4"
                  />
                  <p className="my-auto text-shadow-cyan-300 font-bold text-shadow-xs">
                    {item.name.split("").length < 12
                      ? item.name
                      : item.name.slice(0, 14) + "..."}
                  </p>
                </td>
                <td className="text-center font-bold">
                  {String(item.quotes.USD.price).slice(0, 10)}
                </td>
                <td className="text-center">
                  {item.quotes.USD.percent_change_1h}
                </td>
                <td className="text-center">
                  {item.quotes.USD.percent_change_24h}
                </td>
                <td className="text-center">
                  {item.quotes.USD.percent_change_7d}
                </td>
                <td className="text-center font-medium">
                  {item.quotes.USD.volume_24h}
                </td>
                <td className="text-center font-medium">
                  {item.quotes.USD.market_cap}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex my-5 gap-10">
        <button
          className="py-1 px-2 text-white bg-gray-800 font-bold border-2 rounded-xl cursor-pointer hover:bg-white hover:text-black duration-300"
          onClick={() => setPage((c) => c + 1)}
        >
          Add 100
        </button>
        <button
          className="py-1 px-2 text-white bg-gray-800 font-bold border-2 rounded-xl cursor-pointer hover:bg-white hover:text-black duration-300"
          onClick={() => setPage((c) => c + 3)}
        >
          Add 300
        </button>
      </div>
    </div>
  );
}

export default CoinsList;
