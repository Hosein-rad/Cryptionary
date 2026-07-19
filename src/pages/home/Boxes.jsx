"use client";

import TopCoins from "./TopCoins";
import TopNFTs from "./TopNFTs";
import Gainers from "./Gainers";
import Losers from "./Losers";
import offlineData from "../../data/CoinGecko-Trendings.json";
import { useEffect, useState } from "react";

function Boxes() {
  const [trendingData, setTrendingData] = useState(offlineData);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setTrendingData(data);
    } catch (err) {
      // console.error("CoinGecko fetch failed:", err);
      setTrendingData(offlineData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-10 w-full h-auto justify-center text-center p-2">
      <div className="flex flex-col bg-[rgba(173,225,251,0.7)] hover:bg-[rgba(173,225,251,0.8)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] my-10 py-5 mx-20 text-4xl text-cyan-800 rounded-full  border-white shadow-[0_10px_70px_-10px] shadow-white select-none group-hover:bg-red-100 duration-500">
          Trending Coins
        </h3>
        <TopCoins data={trendingData} />
      </div>
      <div className="flex flex-col bg-[rgba(173,225,251,0.7)] hover:bg-[rgba(173,225,251,0.8)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] my-10 py-5 mx-20 text-4xl text-cyan-800 rounded-full  border-white shadow-[0_10px_70px_-10px] shadow-white select-none group-hover:bg-red-100 duration-500">
          Trending NFTs
        </h3>
        <TopNFTs data={trendingData} />
      </div>

      <div className="flex flex-col bg-[rgba(173,225,251,0.7)] hover:bg-[rgba(173,225,251,0.8)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] mb-3 py-5 mx-20 text-4xl text-cyan-800 rounded-b-full border-b-4 border-red-100 select-none group-hover:bg-red-100 duration-500">
          Highest Gainers
        </h3>
        <Gainers />
      </div>
      <div className="flex flex-col bg-[rgba(173,225,251,0.7)] hover:bg-[rgba(173,225,251,0.8)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] mb-3 py-5 mx-20 text-4xl text-cyan-800 rounded-b-full border-b-4 select-none border-red-100 group-hover:bg-red-100 duration-500">
          Highest Losers
        </h3>
        <Losers />
      </div>
    </div>
  );
}

export default Boxes;
