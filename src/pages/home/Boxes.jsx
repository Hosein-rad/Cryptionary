"use client";

import TopCoins from "./TopCoins";
import TopNFTs from "./TopNFTs";
import Gainers from "./Gainers";
import Losers from "./Losers";
import offlineData from "../../data/CoinGecko-Trendings.json";
import { useQuery } from "@tanstack/react-query";

// 🟢 Reusable title component
function BoxTitle({ children, className = "" }) {
  return (
    <h3
      className={`
        font-['Gorehand'] select-none duration-500
        text-md md:text-2xl lg:text-4xl md:text-nowrap
        py-3 md:py-5 px-4 md:px-7 lg:px-10 mx-4 md:mx-8 lg:mx-15 mb-5 md:mb-10
        text-cyan-800 text-center rounded-b-full border-white
        shadow-[0_10px_70px_-10px] shadow-white
        group-hover:bg-red-100
        ${className}
      `}
    >
      {children}
    </h3>
  );
}

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
    <div className="grid grid-cols-2 gap-2 md:gap-5 lg:gap-10 w-full max-w-6xl mx-auto px-4 md:px-8 mb-20 md:mb-30">
      {/* Trending Coins */}
      <div className="pb-5 flex flex-col bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <BoxTitle>Trending Coins</BoxTitle>
        <TopCoins data={trendingData} />
      </div>

      {/* Trending NFTs */}
      <div className="pb-4 flex flex-col bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <BoxTitle>Trending NFTs</BoxTitle>
        <TopNFTs data={trendingData} />
      </div>

      {/* Highest Gainers – full width on mobile, half on desktop */}
      <div className="flex flex-col col-span-2 md:col-span-1 bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <BoxTitle className="mb-3 border-b-4 border-red-100 rounded-b-full">
          Highest Gainers
        </BoxTitle>
        <Gainers />
      </div>

      {/* Highest Losers – full width on mobile, half on desktop */}
      <div className="flex flex-col col-span-2 md:col-span-1 bg-[rgba(173,225,251,0.5)] hover:bg-[rgba(173,225,251,0.75)] rounded-3xl duration-300 group">
        <BoxTitle className="mb-3 border-b-4 border-red-100 rounded-b-full">
          Highest Losers
        </BoxTitle>
        <Losers />
      </div>
    </div>
  );
}

export default Boxes;
