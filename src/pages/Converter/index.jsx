// pages/Converter.jsx
import { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { FIATS } from "./fiats";
import coins from "../../data/CoinGecko2k.json";

// Popular order (used to sort the list so these appear first)
const POPULAR_IDS = [
  "usd",
  "eur",
  "gbp",
  "jpy",
  "krw",
  "bitcoin",
  "ethereum",
  "tether",
];

export default function Converter({ coins = [] }) {
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

  // Helper to get currency type
  const getType = (id) => allCurrencies.find((c) => c.id === id)?.type;

  const buildEndpoint = () => {
    const fromType = getType(fromCurrency);
    const toType = getType(toCurrency);

    // Crypto → Crypto: from crypto in to crypto
    if (fromType === "crypto" && toType === "crypto") {
      return `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`;
    }

    // Crypto → Fiat: from crypto in to fiat
    if (fromType === "crypto" && toType === "fiat") {
      return `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`;
    }

    // Fiat → Crypto: to crypto in from fiat (then invert)
    if (fromType === "fiat" && toType === "crypto") {
      return `https://api.coingecko.com/api/v3/simple/price?ids=${toCurrency}&vs_currencies=${fromCurrency}`;
    }

    // Fiat → Fiat: use bitcoin as bridge
    return `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${fromCurrency},${toCurrency}`;
  };

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(buildEndpoint());
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      const fromType = getType(fromCurrency);
      const toType = getType(toCurrency);
      let converted;

      if (fromType === "crypto" && toType === "crypto") {
        converted = amount * data[fromCurrency][toCurrency];
      } else if (fromType === "crypto" && toType === "fiat") {
        converted = amount * data[fromCurrency][toCurrency];
      } else if (fromType === "fiat" && toType === "crypto") {
        converted = amount / data[toCurrency][fromCurrency];
      } else {
        // fiat → fiat
        const btcFrom = data.bitcoin[fromCurrency];
        const btcTo = data.bitcoin[toCurrency];
        converted = amount * (btcTo / btcFrom);
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
    <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md p-6 text-white space-y-5">
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
