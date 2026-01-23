import TopCoins from "./TopCoins";
import TopNFTs from "./TopNFTs";
import Gainers from "./Gainers";
import Losers from "./Losers";

function Boxes() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-auto justify-center text-center p-2">
      <div className="flex flex-col">
        <h3 className="mb-4">Trending Coins</h3>
        <TopCoins />
      </div>
      <div className="flex flex-col">
        <h3 className="mb-4">Trending NFTs</h3>
        <TopNFTs />
      </div>
      <div className="flex flex-col">
        <h3 className="mb-4">Highest Gainers</h3>
        <Gainers />
      </div>
      <div className="flex flex-col">
        <h3 className="mb-4">Highest Losers</h3>
        <Losers />
      </div>
    </div>
  );
}

export default Boxes;
