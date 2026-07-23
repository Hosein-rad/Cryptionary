import { useNavigate } from "react-router-dom";

export default function CurrencyItem({
  id_,
  url,
  rank,
  symbol,
  name,
  price,
  changePercent,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="py-1 mx-2 md:mx-4 lg:mx-7 md:px-2 grid grid-flow-col grid-cols-[2fr_2fr_5fr_3fr_3fr] text-sm border-b-1 border-dotted border-gray-600 hover:rounded-full hover:bg-sky-200 hover:scale-105 duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/coin/${id_ || name?.toLowerCase().replace(/\s+/g, "-")}`);
      }}
    >
      {rank && <p className="my-auto font-extralight text-center">{rank}. </p>}
      <img
        src={url || "/cryptionary-icon.png"}
        loading="lazy"
        alt={`${symbol} Logo`}
        className="mx-auto size-7 md:size-9 rounded-full shadow-md shadow-gray-500"
        // onError={(e) => {

        // }}
      />
      {name && (
        <div className="my-auto truncate sm:max-w-35 md:max-w-none">{name}</div>
      )}
      {price && (
        <div className="my-auto">
          <span className="text-yellow-600">$</span>
          {price}
        </div>
      )}
      {changePercent && (
        <div className="ml-2 my-auto font-bold">
          {changePercent > 0 ? (
            <span className="text-green-500">⇡</span>
          ) : (
            <span className="text-red-500">⇣</span>
          )}
          {changePercent}%
        </div>
      )}
    </div>
  );
}
