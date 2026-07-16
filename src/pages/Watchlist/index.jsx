const Watchlist = () => {
  const fetchData = async () => {
    fetch(
      // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y"
      "https://api.coinpaprika.com/v1/tickers"
      // "https://api.coingecko.com/api/v3/search/trending"
      // "https://api.coingecko.com/api/v3/coins/hedera-hashgraph"
      // "https://api.coingecko.com/api/v3/coins/top_gainers_losers"
      // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=30&sort=percent_change_24h&sort_dir=desc",
      // {
      //   headers: {
      //     Accept: "application/json",
      //     "X-CMC_PRO_API_KEY": "7756a6e0-7ea8-414c-a2ab-da333afc0f7a",
      //   },
      // }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="w-full h-100">
      <button onClick={fetchData}>LOG TICKS</button>
    </div>
  );
};

export default Watchlist;
