const DetailsCol = ({ coinData }) => {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const formatter2 = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 5,
  });

  // width of the 24h Range calculator
  const getBarWidth = () => {
    if (!coinData?.market_data) return 0;
    const high = Number(coinData.market_data.high_24h.usd);
    const low = Number(coinData.market_data.low_24h.usd);
    const current = Number(coinData.market_data.current_price.usd);

    if (high - low === 0) return 0;
    const percent = ((current - low) / (high - low)) * 100;
    return Math.min(100, Math.max(0, percent)).toFixed(1);
  };

  const barWidth = getBarWidth();
  return (
    <div className="w-1/3 h-full px-5 flex flex-col items-center justify-start border-r-2 overflow-y-scroll">
      {/* icon - name - symbol - rank */}
      <div className="w-full h-fit mb-2 flex flex-row items-end justify-start">
        <img
          src={coinData.image.large}
          width={50}
          height={50}
          className="self-start size-13 rounded-full"
        />
        <p className="wrap-anywhere">
          <span className="p-2 text-3xl">{coinData.name}</span>
          <span className="text-gray-300 text-nowrap uppercase">
            {coinData.symbol}
          </span>
          <span className="py-0.5 px-1.5 mx-2 text-nowrap text-gray-300 bg-gray-700 rounded-md">
            #{coinData.market_cap_rank}
          </span>
        </p>
      </div>

      {/* price and price change % */}
      <div className="pt-3 w-full flex flex-row items-end">
        <p className="text-5xl">
          ${formatter2.format(coinData.market_data.current_price.usd)}
        </p>
        <div className="w-full mx-2 my-1 flex flex-row items-end justify-start text-center">
          {Number(coinData.market_data.price_change_percentage_24h) < 0 ? (
            <p className="text-red-400">
              {Math.abs(
                coinData.market_data.price_change_percentage_24h
              ).toFixed(2)}
              % ▼(24h)
            </p>
          ) : (
            <p className="text-green-300">
              {Math.abs(
                coinData.market_data.price_change_percentage_24h
              ).toFixed(2)}
              % ▲(24h)
            </p>
          )}
        </div>
      </div>

      {/* 24h Range */}
      <div className="relative my-7 w-full h-2 bg-gray-800 rounded-full">
        <div
          className={`absolute h-2 rounded-full bg-white`}
          style={{ width: `${barWidth}%` }}
        ></div>
        <div className="mt-2 flex justify-between">
          <p>${formatter2.format(coinData.market_data.low_24h.usd)}</p>
          <p>24h Range</p>
          <p>${formatter2.format(coinData.market_data.high_24h.usd)}</p>
        </div>
      </div>

      {/* Watchlist */}
      <div className="flex w-full">
        <button className="p-2 mx-2 w-full flex justify-between rounded-lg bg-gray-600 text-left">
          <span>🖈Add to Watchlist </span>
          <span>
            <span className="my-auto animate-pulse text-xs text-blue-500">
              ⏺
              {" "}
            </span>
            <span>
              {formatter.format(coinData.watchlist_portfolio_users)}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline"
              >
                <path
                  d="M5.83594 18.847C9.02908 15.5032 14.932 15.3458 18.1594 18.847M15.414 8.57748C15.414 10.4671 13.8804 12.0007 11.9867 12.0007C11.5367 12.0014 11.091 11.9134 10.675 11.7417C10.2591 11.5699 9.88106 11.3179 9.56261 11C9.24416 10.682 8.99152 10.3044 8.81914 9.88874C8.64677 9.47306 8.55805 9.02748 8.55805 8.57748C8.55805 6.68788 10.0916 5.1543 11.9867 5.1543C12.4366 5.15376 12.8822 5.2419 13.298 5.41369C13.7137 5.58548 14.0916 5.83755 14.4099 6.15547C14.7282 6.4734 14.9807 6.85095 15.153 7.26653C15.3253 7.68212 15.414 8.12759 15.414 8.57748Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              Added
            </span>
          </span>
        </button>
      </div>

      {/* Market Data List */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between border-b">
          <p>Market Cap</p>
          <p>${formatter.format(coinData.market_data.market_cap.usd)}</p>
        </div>
        <div className="w-full flex justify-between border-b">
          <p>Fully Diluted Valuation</p>
          <p>
            $
            {formatter.format(coinData.market_data.fully_diluted_valuation.usd)}
          </p>
        </div>
        <div className="w-full flex justify-between border-b">
          <p>24 Hour Trading Vol</p>
          <p>${formatter.format(coinData.market_data.total_volume.usd)}</p>
        </div>
        <div className="w-full flex justify-between border-b">
          <p>Circulating Supply</p>
          <p>{formatter.format(coinData.market_data.circulating_supply)}</p>
        </div>
        <div className="w-full flex justify-between border-b">
          <p>Total Supply</p>
          <p>{formatter.format(coinData.market_data.total_supply)}</p>
        </div>
        <div className="w-full flex justify-between border-b">
          <p>Max Supply</p>
          <p>
            {coinData.market_data.max_supply_infinite
              ? "∞"
              : formatter.format(coinData.market_data.max_supply)}
          </p>
        </div>
      </div>

      {/* Info Section List */}
      <div className="mt-10 w-full flex flex-col">
        <h3>Info</h3>
        {/* Website */}
        <div className="w-full flex justify-between border-b">
          <p>Website</p>
          <a
            href={coinData.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline"
          >
            {coinData.links.homepage[0]}
          </a>
        </div>
        {/* Explorers (Blockchain explorers) */}
        <div className="w-full flex justify-between border-b">
          <p>Explorers</p>
          <div className="flex flex-col items-end gap-1">
            {coinData.links.blockchain_site.slice(0, 3).map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline text-xs"
              >
                {new URL(url).hostname}
              </a>
            ))}
          </div>
        </div>
        {/* Community (social links) */}
        <div className="w-full flex justify-between border-b">
          <p>Community</p>
          <div className="flex flex-col items-end gap-1">
            {coinData.links.twitter_screen_name && (
              <a
                href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline text-xs"
              >
                Twitter
              </a>
            )}
            {coinData.links.subreddit_url && (
              <a
                href={coinData.links.subreddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline text-xs"
              >
                Reddit
              </a>
            )}
            {coinData.links.facebook_username && (
              <a
                href={`https://facebook.com/${coinData.links.facebook_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline text-xs"
              >
                Facebook
              </a>
            )}
            {coinData.links.telegram_channel_identifier && (
              <a
                href={`https://t.me/${coinData.links.telegram_channel_identifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline text-xs"
              >
                Telegram
              </a>
            )}
          </div>
        </div>
        {/* Search on Twitter / CoinGecko */}
        <div className="w-full flex justify-between border-b">
          <p>Search on</p>
          <a
            href={`https://twitter.com/search?q=${coinData.symbol.toUpperCase()}&src=cashtag_click`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline"
          >
            Twitter ${coinData.symbol.toUpperCase()}
          </a>
        </div>
        {/* Source Code */}
        <div className="w-full flex justify-between border-b">
          <p>Source Code</p>
          <div className="flex flex-col items-end gap-1">
            {coinData.links.repos_url.github.slice(0, 2).map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline text-xs"
              >
                GitHub
              </a>
            ))}
          </div>
        </div>
        {/* API ID */}
        <div className="w-full flex justify-between border-b">
          <p>API ID</p>
          <p className="font-mono">{coinData.id}</p>
        </div>
        {/* Chains (asset platform) – null for Bitcoin, otherwise show platform name */}
        <div className="w-full flex justify-between border-b">
          <p>Chains</p>
          <p>{coinData.asset_platform_id || "Own chain"}</p>
        </div>
        {/* Categories */}
        <div className="w-full flex justify-between border-b">
          <p>Categories</p>
          <div className="flex flex-wrap justify-end gap-1">
            {coinData.categories.map((cat) => (
              <span
                key={cat}
                className="bg-cyan-800 text-cyan-200 px-2 py-0.5 rounded-full text-xs"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BTC Historical Price */}
      <div className="mt-10 w-full flex flex-col">
        <h3>BTC Historical Price</h3>
        {/* 24h Range */}
        <div className="w-full flex justify-between border-b">
          <p>24h Range</p>
          <p>
            ${formatter2.format(coinData.market_data.low_24h.usd)} – $
            {formatter2.format(coinData.market_data.high_24h.usd)}
          </p>
        </div>
        {/* All-Time High */}
        <div className="w-full flex justify-between border-b">
          <p>All-Time High</p>
          <div className="text-right">
            <p>${formatter2.format(coinData.market_data.ath.usd)}</p>
            <p className="text-xs text-red-400">
              {formatter.format(coinData.market_data.ath_change_percentage.usd)}
              % (from ATH)
            </p>
            <p className="text-xs text-gray-400">
              {new Date(coinData.market_data.ath_date.usd).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </p>
          </div>
        </div>
        {/* All-Time Low */}
        <div className="w-full flex justify-between border-b">
          <p>All-Time Low</p>
          <div className="text-right">
            <p>${formatter2.format(coinData.market_data.atl.usd)}</p>
            <p className="text-xs text-green-400">
              {coinData.market_data.atl_change_percentage.usd.toFixed(1)}% (from
              ATL)
            </p>
            <p className="text-xs text-gray-400">
              {new Date(coinData.market_data.atl_date.usd).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Chain Overview */}
      <div className="mt-10 w-full flex flex-col">
        <h3>Chain Overview</h3>
        {/* Launch Date */}
        <div className="w-full flex justify-between border-b">
          <p>Launch Date</p>
          <p>
            {coinData.genesis_date
              ? new Date(coinData.genesis_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        {/* Hashing Algorithm */}
        <div className="w-full flex justify-between border-b">
          <p>Hashing Algorithm</p>
          <p>{coinData.hashing_algorithm || "N/A"}</p>
        </div>
        <div className="w-full flex justify-between border-b">
          <p>Block Time</p>
          <p>
            {coinData.block_time_in_minutes
              ? `${coinData.block_time_in_minutes} minutes`
              : "N/A"}
          </p>
        </div>
        {/* Community Sentiment (votes) */}
        <div className="w-full flex justify-between border-b">
          <p>Community Sentiment</p>
          <div className="flex gap-3 text-sm">
            <span className="text-green-400">
              👍 {coinData.sentiment_votes_up_percentage}%
            </span>
            <span className="text-red-400">
              👎 {coinData.sentiment_votes_down_percentage}%
            </span>
          </div>
        </div>
        {/* Reddit Subscribers */}
        {coinData.community_data?.reddit_subscribers > 0 && (
          <div className="w-full flex justify-between border-b">
            <p>Reddit Subscribers</p>
            <p>{coinData.community_data.reddit_subscribers.toLocaleString()}</p>
          </div>
        )}
        {/* Reddit Active Accounts (48h) */}
        {coinData.community_data?.reddit_accounts_active_48h > 0 && (
          <div className="w-full flex justify-between border-b">
            <p>Reddit Active Accounts (48h)</p>
            <p>
              {coinData.community_data.reddit_accounts_active_48h.toLocaleString()}
            </p>
          </div>
        )}
        {/* Reddit Average Posts (48h) */}
        {coinData.community_data?.reddit_average_posts_48h > 0 && (
          <div className="w-full flex justify-between border-b">
            <p>Reddit Posts (48h avg)</p>
            <p>{coinData.community_data.reddit_average_posts_48h}</p>
          </div>
        )}
        {/* Reddit Average Comments (48h) */}
        {coinData.community_data?.reddit_average_comments_48h > 0 && (
          <div className="w-full flex justify-between border-b">
            <p>Reddit Comments (48h avg)</p>
            <p>{coinData.community_data.reddit_average_comments_48h}</p>
          </div>
        )}
        {/* Facebook Likes */}
        {coinData.community_data?.facebook_likes != null && (
          <div className="w-full flex justify-between border-b">
            <p>Facebook Likes</p>
            <p>{coinData.community_data.facebook_likes.toLocaleString()}</p>
          </div>
        )}
        {/* Telegram Channel Users */}
        {coinData.community_data?.telegram_channel_user_count != null && (
          <div className="w-full flex justify-between border-b">
            <p>Telegram Users</p>
            <p>
              {coinData.community_data.telegram_channel_user_count.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <button
        className="p-5 rounded-full bg-black"
        onClick={() => console.log(coinData)}
      >
        coin data LOG
      </button>
      {/* <button
            className="p-5 rounded-full bg-black"
            onClick={() => console.log(chartData)}
          >
            chart data LOG
          </button> */}
    </div>
  );
};

export default DetailsCol;
