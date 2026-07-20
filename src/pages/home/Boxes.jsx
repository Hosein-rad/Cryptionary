"use client";

import TopCoins from "./TopCoins";
import TopNFTs from "./TopNFTs";
import Gainers from "./Gainers";
import Losers from "./Losers";
import offlineData from "../../data/CoinGecko-Trendings.json";
import { useQuery } from "@tanstack/react-query";

function Boxes() {
  const { data: trendingData = offlineData } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      return res.json();
    },
    initialData: offlineData,
    staleTime: 60000,
  });

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10 w-9/10 mx-auto justify-center text-center p-2 mb-30">
      <div className="flex flex-col bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] my-10 py-5 mx-20 text-4xl text-cyan-800 rounded-full  border-white shadow-[0_10px_70px_-10px] shadow-white select-none group-hover:bg-red-100 duration-500">
          Trending Coins
        </h3>
        <TopCoins data={trendingData} />
      </div>
      <div className="flex flex-col bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] my-10 py-5 mx-20 text-4xl text-cyan-800 rounded-full  border-white shadow-[0_10px_70px_-10px] shadow-white select-none group-hover:bg-red-100 duration-500">
          Trending NFTs
        </h3>
        <TopNFTs data={trendingData} />
      </div>

      <div className="flex flex-col bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] mb-3 py-5 mx-20 text-4xl text-cyan-800 rounded-b-full border-b-4 border-red-100 select-none group-hover:bg-red-100 duration-500">
          Highest Gainers
        </h3>
        <Gainers />
      </div>
      <div className="flex flex-col bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <h3 className="font-['Gorehand'] mb-3 py-5 mx-20 text-4xl text-cyan-800 rounded-b-full border-b-4 select-none border-red-100 group-hover:bg-red-100 duration-500">
          Highest Losers
        </h3>
        <Losers />
      </div>
    </div>
  );
}

export default Boxes;
