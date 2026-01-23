import TrendingCoins from "../../../data/CoinGecko-Trendings.json";

function TopCoins() {
  let jsx = [];
  for (let x = 0; x < Object.keys(TrendingCoins.coins).length; x++) {
    jsx.push(
      <a
        href={TrendingCoins.coins[x].item.thumb}
        key={TrendingCoins.coins[x].item.coin_id}
      >
        <img
          src={TrendingCoins.coins[x].item.small}
          alt={TrendingCoins.coins[x].item.name + "Logo"}
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

export default TopCoins;
