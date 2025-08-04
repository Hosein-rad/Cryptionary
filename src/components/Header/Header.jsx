import AccountIcon from "./AccountIcon";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="flex justify-between bg-gray-600">
      <Logo />
      <SearchBar />
      <div className="flex">
        <DarkMode />
        <AccountIcon />
      </div>
    </div>
  );
}
