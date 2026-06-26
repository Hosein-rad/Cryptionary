import DarkMode from "./DarkMode";
import Searchbar from "./SearchBar";
import coins from "../../data/CoinGecko2k.json";

// import { useState, useEffect } from "react";

export default function Header() {
  return (
    <div className="z-100 w-full px-2 py-1 flex justify-between fixed top-0 backdrop-blur-md mask-b-from-90%">
      <div className="h-10 px-2 mt-1 flex items-center justify-center cursor-pointer0">
        <img
          src="/logo.webp"
          alt="Cryptionary logo"
          className="my-auto h-12 w-auto"
        />
      </div>
      <Searchbar coins={coins} />
      <div className="flex">
        <DarkMode />
      </div>
    </div>
  );
}
