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
    <div className="w-10/12 flex items-center self-center">
      <p>{rank}_ </p>
      <img
        src={url}
        alt={`${symbol} Logo`}
        className="mx-3 size-10 rounded-full"
      />
      <p>{name}_ </p>
      <p>{price?.toFixed(6)}__ </p>
      <p>{change1h}_ </p>
      <p>{change1d}_ </p>
      <p>{change1w}_ </p>
      <p>{volume24}_ </p>
      <p>{marketCap}_ </p>
      {/* <p>{miniChartData}_ </p> */}
      <p> {changePercent}</p>
    </div>
  );
}
