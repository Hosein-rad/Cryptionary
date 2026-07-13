const Watchlist = () => {
  const fetchData = async () => {
    fetch("https://api.coinpaprika.com/v1/tickers")
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
