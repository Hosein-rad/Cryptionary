// import { useEffect, useState } from "react";
// import CoinPaprikaDataOffline from "../../data/CoinPaprika-Top2k.json";
// import MetaData from "../../data/MetaDataof2kCoins.json";

// function CoinsList() {
//   const [page, setPage] = useState(1);
//   const [favorite, setFavorite] = useState([]);
//   const [coinsList, setCoinsList] = useState([]);

//   useEffect(() => {
//     const CoinPaprikaData = async () => {
//       fetch("https://api.coinpaprika.com/v1/tickers")
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((err) => {
//           console.log(err);
//           return false;
//         });
//     };
//     setCoinsList([]);
//     if (CoinPaprikaData) {
//       for (let x = 0; x < 100 * page; x++) {
//         setCoinsList((c) => [...c, CoinPaprikaData[x]]);
//       }
//     } else {
//       for (let x = 0; x < 100 * page; x++) {
//         setCoinsList((c) => [...c, CoinPaprikaDataOffline[x]]);
//       }
//     }
//   }, [page]);

//   return (
//     <div
//       className="flex flex-col items-center"
//       style={{
//         backgroundImage: `url("https://ghab24.com/movafaghiat/media/appmedia/image/GHAB%20MEDIA%20DESKTOP%201025-min.jpg")`,
//         backgroundPosition: "center",
//         backgroundSize: "auto",
//         backgroundRepeat: "repeat",
//         width: "100%",
//       }}
//     >
//       <table className="w-full">
//         <thead className="sticky top-16">
//           <tr className="w-full h-7 text-sm bg-blue-200 cursor-default">
//             <th className="w-[4%]"></th>
//             <th className="w-[5%]">Rank</th>
//             <th className="w-[12%]">Coin</th>
//             <th className="w-[10%]">Price ($)</th>
//             <th className="w-[7%]">1h (%)</th>
//             <th className="w-[7%]">1d (%)</th>
//             <th className="w-[7%]">1w (%)</th>
//             <th className="w-[15%]">Volume (24h)</th>
//             <th className="w-[12%]">Market Cap (24h)</th>
//             {/* <th className="w-[21%]">All Time</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {coinsList?.map((item) => {
//             return (
//               <tr
//                 className="text-[12px] text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 z-50 cursor-pointer"
//                 key={crypto.randomUUID()}
//               >
//                 <td
//                   onClick={() =>
//                     !favorite.includes(item)
//                       ? setFavorite((c) => [...c, item])
//                       : setFavorite((c) => c.filter((i) => i.id != item.id))
//                   }
//                   className="text-center text-amber-300 cursor-copy hover:scale-120"
//                 >
//                   {favorite.includes(item) ? "★" : "☆"}
//                 </td>
//                 <td className="text-center font-medium underline">
//                   {item.rank}
//                 </td>
//                 <td className="flex ml-1 items-center">
//                   <img
//                     src={MetaData[item?.symbol]?.url}
//                     className="rounded-full size-6 mx-4"
//                   />
//                   <p className="my-auto text-shadow-cyan-300 font-bold text-shadow-xs">
//                     {item.name.split("").length < 12
//                       ? item.name
//                       : item.name.slice(0, 14) + "..."}
//                   </p>
//                 </td>
//                 <td className="text-center font-bold">
//                   {String(item.quotes.USD.price).slice(0, 10)}
//                 </td>
//                 <td className="text-center">
//                   {item.quotes.USD.percent_change_1h}
//                 </td>
//                 <td className="text-center">
//                   {item.quotes.USD.percent_change_24h}
//                 </td>
//                 <td className="text-center">
//                   {item.quotes.USD.percent_change_7d}
//                 </td>
//                 <td className="text-center font-medium">
//                   {item.quotes.USD.volume_24h}
//                 </td>
//                 <td className="text-center font-medium">
//                   {item.quotes.USD.market_cap}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="flex my-5 gap-10">
//         <button
//           className="py-1 px-2 text-white bg-gray-800 font-bold border-2 rounded-xl cursor-pointer hover:bg-white hover:text-black duration-300"
//           onClick={() => setPage((c) => c + 1)}
//         >
//           Add 100
//         </button>
//         <button
//           className="py-1 px-2 text-white bg-gray-800 font-bold border-2 rounded-xl cursor-pointer hover:bg-white hover:text-black duration-300"
//           onClick={() => setPage((c) => c + 3)}
//         >
//           Add 300
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CoinsList;

import { useEffect, useState, useCallback } from "react";
import CoinPaprikaDataOffline from "../../data/CoinPaprika-Top2k.json";
import MetaData from "../../data/MetaDataof2kCoins.json";
import MiniChart from "./MiniChart";

function CoinsList() {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [fullData, setFullData] = useState([]);

  // Fetch data once (API first, fallback to offline JSON)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("httpsa://api.coinpaprika.com/v1/tickers");
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        setFullData(data);
        console.log(data);
      } catch (err) {
        console.warn(
          "CoinPaprika fetch failed. Now using offline data instead.",
          err
        );
        setFullData(CoinPaprikaDataOffline);
      }
    };
    fetchData();
  }, []);

  // Derived list: show first (page * 100) items
  const ListofCoins = fullData.slice(0, 100 * page);
  console.log(ListofCoins);
  // Toggle favorite (by id, not object reference)
  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  }, []);

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
            <th className="w-[12%]">Market Cap</th>
            <th className="w-[20%]">Mini Chart (24h)</th>
          </tr>
        </thead>
        <tbody>
          {ListofCoins.map((item) => {
            // Defensive check
            if (!item) return null;

            const imgUrl = MetaData[item.symbol]?.url || null;
            const isFav = favorites.includes(item.id);
            const shortName =
              item.name?.length > 14
                ? item.name.slice(0, 14) + "..."
                : item.name;

            return (
              <tr
                key={item.id}
                className="text-[12px] text-white hover:bg-[rgba(0,200,255,0.5)] duration-300 z-50 cursor-pointer"
              >
                {/* Star */}
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="text-center text-amber-300 cursor-copy hover:scale-120"
                >
                  {isFav ? "★" : "☆"}
                </td>

                <td className="text-center font-medium underline">
                  {item.rank}
                </td>

                <td className="flex ml-1 items-center">
                  <img
                    src={imgUrl}
                    alt={item.symbol}
                    className="rounded-full size-6 mx-4"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <p className="my-auto text-shadow-cyan-300 font-bold text-shadow-xs">
                    {shortName}
                  </p>
                </td>

                <td className="text-center font-bold">
                  {Number(item.quotes.USD.price).toFixed(2)}
                </td>
                <td className="text-center">
                  {item.quotes.USD.percent_change_1h?.toFixed(1)}%
                </td>
                <td className="text-center">
                  {item.quotes.USD.percent_change_24h?.toFixed(1)}%
                </td>
                <td className="text-center">
                  {item.quotes.USD.percent_change_7d?.toFixed(1)}%
                </td>
                <td className="text-center font-medium">
                  {Number(item.quotes.USD.volume_24h).toLocaleString()}
                </td>
                <td className="text-center font-medium">
                  {Number(item.quotes.USD.market_cap).toLocaleString()}
                </td>
                <td className="text-center font-medium">
                  <MiniChart
                    currentPrice={item.quotes.USD.price}
                    percentChanges={item.quotes.USD}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
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
