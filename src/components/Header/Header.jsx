import DarkMode from "./DarkMode";
import Searchbar from "./SearchBar";
import coins from "../../data/CoinGecko2k.json";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full px-2 py-1 flex justify-between fixed top-0 backdrop-blur-xl z-100">
      <NavLink
        to={"/"}
        className="h-10 px-2 mt-1 flex items-center justify-center cursor-pointer"
      >
        <img
          src="/logo.webp"
          alt="Cryptionary logo"
          className="my-auto h-12 w-auto rounded-xl"
        />
      </NavLink>
      <Searchbar coins={coins} />
      <div className="flex">
        <DarkMode />
      </div>
    </div>
  );
}
