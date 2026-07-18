import { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { FIATS } from "./fiats";
import coins from "../../data/CoinGecko2k.json";

const POPULAR_IDS = [
  "bitcoin",
  "usd",
  "eur",
  "tether",
  "ethereum",
  "gbp",
  "jpy",
  "krw",
];

export default function Converter() {
  // Merge fiats + cryptos and sort by popularity
  const allCurrencies = [
    ...FIATS.map((f) => ({ ...f, type: "fiat" })),
    ...coins.map((c) => ({ ...c, type: "crypto" })),
  ].sort((a, b) => {
    const aIdx = POPULAR_IDS.indexOf(a.id);
    const bIdx = POPULAR_IDS.indexOf(b.id);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  const [fromCurrency, setFromCurrency] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("usd");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to get full currency object
  const getCurrencyObj = (id) => allCurrencies.find((c) => c.id === id);
  const getType = (id) => getCurrencyObj(id)?.type;

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }
    setLoading(true);
    setError("");

    const fromType = getType(fromCurrency);
    const toType = getType(toCurrency);
    const fromSymbol = getCurrencyObj(fromCurrency)?.symbol?.toLowerCase();
    const toSymbol = getCurrencyObj(toCurrency)?.symbol?.toLowerCase();

    try {
      let url, response, converted;

      if (fromType === "crypto" && toType === "crypto") {
        // Crypto → Crypto : fetch both prices in USD, then divide
        url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`;
        response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        const fromPrice = data[fromCurrency]?.usd;
        const toPrice = data[toCurrency]?.usd;
        if (!fromPrice || !toPrice)
          throw new Error("Price not available for one of the coins.");
        converted = amount * (fromPrice / toPrice);
      } else if (fromType === "crypto" && toType === "fiat") {
        // Crypto → Fiat : use direct pair, vs_currencies = fiat symbol
        url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toSymbol}`;
        response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        converted = amount * data[fromCurrency][toSymbol];
      } else if (fromType === "fiat" && toType === "crypto") {
        // Fiat → Crypto : need crypto price in fiat, then invert
        url = `https://api.coingecko.com/api/v3/simple/price?ids=${toCurrency}&vs_currencies=${fromSymbol}`;
        response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        converted = amount / data[toCurrency][fromSymbol];
      } else {
        // Fiat → Fiat : use bitcoin as bridge
        url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${fromSymbol},${toSymbol}`;
        response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        const btcFrom = data.bitcoin[fromSymbol];
        const btcTo = data.bitcoin[toSymbol];
        converted = (amount / btcFrom) * btcTo;
      }

      setResult(converted.toFixed(6));
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 h-100 mx-auto bg-gray-900 rounded-xl shadow-md p-6 text-white space-y-5">
      <h2 className="text-2xl font-bold">Converter</h2>

      <div className="flex gap-3 items-end">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-1/2 p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm"
          min="0"
        />
        <div className="w-1/2">
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            currencies={allCurrencies}
          />
        </div>
      </div>

      <div className="flex gap-3 items-end">
        <input
          type="text"
          value={result !== null ? result : ""}
          readOnly
          placeholder="Result"
          className="w-1/2 p-2 rounded bg-gray-800 border border-gray-700 text-white text-sm cursor-default"
        />
        <div className="w-1/2">
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            currencies={allCurrencies}
          />
        </div>
      </div>

      <button
        onClick={handleConvert}
        disabled={loading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 py-2 rounded font-semibold transition"
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
