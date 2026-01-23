import AccountIcon from "./AccountIcon";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="w-full px-2 py-1 flex justify-between fixed bg-gray-600">
      <Logo />
      <SearchBar />
      <div className="flex">
        <DarkMode />
        <AccountIcon />
      </div>
    </div>
  );
}
