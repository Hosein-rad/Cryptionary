import TrendingCoins from "../../../data/CoinGecko-Trendings.json";

function TopNFTs() {
  let jsx = [];
  for (let x = 0; x < Object.keys(TrendingCoins.nfts).length; x++) {
    jsx.push(
      <a
        href={TrendingCoins.nfts[x].thumb}
        key={TrendingCoins.nfts[x].nft_contract_id}
      >
        <img
          src={TrendingCoins.nfts[x].thumb}
          alt={TrendingCoins.nfts[x].name + "Logo"}
        />
      </a>
    );
  }
  return (
    <div className="m-auto flex bg-amber-200 justify-center items-center flex-wrap">
      {jsx.map((item) => item)}
    </div>
  );
}

export default TopNFTs;
