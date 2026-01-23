import Header from "./Header";
import Boxes from "./Boxes";
import CoinsList from "./CoinsList";

function currencies() {
  return (
    <div className="mt-14 ml-14 pt-5 mr-2 w-dvw h-full bg-gray-500 border-0 rounded-tl-4xl rounded-tr-lg">
      <Header />
      <Boxes />
      <CoinsList />
    </div>
  );
}

export default currencies;
