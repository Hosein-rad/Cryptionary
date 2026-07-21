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
        className="h-10 px-2 mt-1 flex items-center justify-center cursor-pointer"
      >
        <img
          src="/logo.webp"
          alt="Cryptionary logo"
          className="py-1 h-full w-auto rounded-xl hover:scale-150 hover:translate-x-5 hover:translate-y-2 duration-300 outline-0"
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
