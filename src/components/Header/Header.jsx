import AccountIcon from "./AccountIcon";
import DarkMode from "./DarkMode";
import Searchbar from "./SearchBar";
import coins from "../../data/CoinGecko2k.json";

// import { useState, useEffect } from "react";

export default function Header() {
  return (
    <div className="z-100 w-full px-2 py-1 flex justify-between fixed bg-[#0C2A43]">
      <div className="h-10 px-2 mt-1 font-extrabold text-blue-400 border-4 border-cyan-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-cyan-300 hover:border-cyan-500 duration-700 hover:text-blue-800">
        <p className="">Hosein.dev</p>
      </div>
      <Searchbar coins={coins} />
      <div className="flex">
        <DarkMode />
        <AccountIcon />
      </div>
    </div>
  );
}
