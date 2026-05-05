import Header from "./Header";
import Boxes from "./Boxes";
import CoinsList from "./CoinsList";

function currencies() {
  return (
    <div
      className="mt-11 ml-14 pt-5 px-3 w-dvw h-full border-0 rounded-tl-4xl rounded-tr-lg bg-[#0C2A43]
    "
    >
      <Header />
      <Boxes />
      <CoinsList />
    </div>
  );
}

export default currencies;
