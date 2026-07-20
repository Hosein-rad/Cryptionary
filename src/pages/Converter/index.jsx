import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // ADDED
import CurrencySelect from "./CurrencySelect";
import { FIATS } from "./fiats";
import coins from "../../data/CoinGecko2k.json";
import GradientTitle from "../../ui/GradientTitle";

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

  const getCurrencyObj = (id) => allCurrencies.find((c) => c.id === id);
  const getType = (id) => getCurrencyObj(id)?.type;

  // ---- React Query conversion ----
  const {
    data: result,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["conversion", fromCurrency, toCurrency, amount],
    queryFn: async () => {
      const num = Number(amount);
      if (!amount || isNaN(num) || num <= 0) {
        throw new Error("Enter a valid amount");
      }

      const fromType = getType(fromCurrency);
      const toType = getType(toCurrency);
      const fromSymbol = getCurrencyObj(fromCurrency)?.symbol?.toLowerCase();
      const toSymbol = getCurrencyObj(toCurrency)?.symbol?.toLowerCase();

      let converted;

      if (fromType === "crypto" && toType === "crypto") {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency},${toCurrency}&vs_currencies=usd`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        const fromPrice = data[fromCurrency]?.usd;
        const toPrice = data[toCurrency]?.usd;
        if (!fromPrice || !toPrice)
          throw new Error("Price not available for one of the coins.");
        converted = num * (fromPrice / toPrice);
      } else if (fromType === "crypto" && toType === "fiat") {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toSymbol}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        converted = num * data[fromCurrency][toSymbol];
      } else if (fromType === "fiat" && toType === "crypto") {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${toCurrency}&vs_currencies=${fromSymbol}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        converted = num / data[toCurrency][fromSymbol];
      } else {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${fromSymbol},${toSymbol}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        const btcFrom = data.bitcoin[fromSymbol];
        const btcTo = data.bitcoin[toSymbol];
        converted = (num / btcFrom) * btcTo;
      }

      return converted.toFixed(6);
    },
    enabled: false,
    staleTime: 60000,
    retry: false,
  });

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      refetch();
      return;
    }
    refetch();
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <div className="min-w-1/2 min-h-1/2 m-auto p-10 backdrop-brightness-50 rounded-xl text-white">
        <GradientTitle text="Converter" className="h-30 text-7xl" />
        <div className="mt-5 flex gap-5 items-end">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-1/2 p-2 rounded bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm"
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

        <div className="mt-5 flex gap-5 items-end">
          <input
            type="text"
            value={result !== undefined && result !== null ? result : ""}
            readOnly
            placeholder="Result"
            className="w-1/2 p-2 rounded outline-0 bg-gray-900 border border-gray-700 text-white text-sm cursor-default"
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
          disabled={isFetching}
          className="mt-10 w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 py-2 rounded font-semibold transition cursor-pointer"
        >
          {isFetching ? "Converting..." : "Convert"}
        </button>

        {error && <p className="text-red-400 text-sm">{error.message}</p>}
      </div>
      <p className="text-white text-lg">
        Crypto ⇄ Crypto · Fiat ⇄ Fiat · Crypto ⇄ Fiat · All in one place
      </p>
    </div>
  );
}
