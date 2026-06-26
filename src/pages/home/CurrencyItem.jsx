export default function CurrencyItem({
  url,
  rank,
  symbol,
  name,
  marketCap,
  miniChartData,
  change1h,
  change1d,
  change1w,
  volume24,
  price,
  changePercent,
}) {
  return (
    <div
      className="py-1 mx-7 grid grid-flow-col grid-cols-[2fr_2fr_5fr_3fr] border-b-1 border-dotted border-gray-600 hover:rounded-full hover:bg-sky-200 hover:scale-105 duration-300 cursor-pointer"
    >
      {rank && <p className="my-auto font-extralight text-center">{rank}. </p>}

      <img
        src={url}
        alt={`${symbol} Logo`}
        className="mx-auto size-10 rounded-full shadow-md shadow-gray-500"
      />

      {name && <div>{name} </div>}
      {price && <div className="my-auto">{price?.toFixed(16)} $</div>}
      {change1h && <div>{change1h} </div>}
      {change1d && <div>{change1d} </div>}
      {change1w && <div>{change1w} </div>}
      {volume24 && <div>{volume24} </div>}
      {marketCap && <div>{marketCap} </div>}
      {miniChartData && <div>{miniChartData} </div>}
      {changePercent && (
        <div className="my-auto font-bold">{changePercent}%</div>
      )}
    </div>
  );
}
