import DarkMode from "./DarkMode";
import Searchbar from "./SearchBar";
import coins from "../../data/CoinGecko2k.json";
import { NavLink } from "react-router-dom";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <div className="h-15 w-full px-2 py-1 flex justify-between fixed top-0 backdrop-blur-sm z-100">
      <NavLink
        to={"/"}
        className="h-10 mr-2 mt-1 flex items-center justify-center cursor-pointer"
      >
        <img
          src="/logo.webp"
          alt="Cryptionary logo"
          className="sm:py-1 h-6 sm:h-full w-auto rounded-xl hover:scale-120 hover:translate-x-2 hover:translate-y-1 hover:animate-pulse duration-300 outline-0"
        />
      </NavLink>
      <Searchbar coins={coins} />
      <div className="flex">
        {/* <DarkMode /> */}
        <NavMenu />
      </div>
    </div>
  );
}
