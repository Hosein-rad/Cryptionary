const Watchlist = () => {
  const fetchData = async () => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y"
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
