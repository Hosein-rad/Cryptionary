import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CoinDetail() {
  const { coinId } = useParams(); // extracts "bitcoin" from /coin/bitcoin
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => res.json())
      .then((data) => setCoinData(data));
  }, [coinId]);

  if (!coinData) return <div>Loading…</div>;

  return (
    <div>
      <h1>{coinData.name}</h1>
      <p>Price: ${coinData.market_data.current_price.usd}</p>
      {/* … more details */}
    </div>
  );
}
