import { useState } from "react";
import useWatchlist from "../../hooks/useWatchlist/useWatchlist";
import GradientTitle from "../../ui/GradientTitle";
import { SVGs } from "./SVGs";

const DetailsCol = ({ coinData }) => {
  const { toggleCoin, isWatched } = useWatchlist();

  // for "categories" more than 3
  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = showAllCategories
    ? coinData.categories
    : coinData.categories.slice(0, 3);
  const hasMore = coinData.categories.length > 3;

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const formatter2 = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 5,
  });

  const getBarToHigh = () => {
    if (!coinData?.market_data) return 0;
    const high = Number(coinData.market_data.high_24h.usd);
    const low = Number(coinData.market_data.low_24h.usd);
    const current = Number(coinData.market_data.current_price.usd);

    if (high - low === 0) return 0;
    const percent = ((high - current) / (high - low)) * 100; // distance to high
    return Math.min(100, Math.max(0, percent)).toFixed(1);
  };
  const barToHigh = getBarToHigh();

  return (
    <div className="w-1/3 h-full px-5 pb-25 mt-10 flex flex-col items-center justify-start border-r-2 overflow-y-scroll">
      {/* icon - name - symbol - rank */}
      <div className="w-full h-fit mb-2 flex flex-row items-end justify-start">
        <img
          src={coinData.image.large}
          width={50}
          height={50}
          className="self-center w-1/4 h-auto rounded-full"
        />
        <div className="ml-5">
          {/* <span className="p-2 text-3xl">{coinData.name}</span> */}
          <GradientTitle text={coinData.name} className="block text-4xl" />
          <div className="flex items-end justify-start">
            <p className="text-gray-300 text-nowrap uppercase">
              {coinData.symbol}
            </p>
            {coinData.market_cap_rank && (
              <p className="py-0.5 px-1.5 mx-2 text-nowrap text-gray-300 bg-gray-700 rounded-md">
                #{coinData.market_cap_rank}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* price and price change % */}
      <div className="mt-8 w-full flex flex-row items-end justify-between">
        <p className="text-5xl">
          ${formatter2.format(coinData.market_data.current_price.usd)}
        </p>
        <div className="my-1 flex flex-row items-end justify-start text-2xl">
          {Number(coinData.market_data.price_change_percentage_24h) < 0 ? (
            <p className="text-red-400">
              ⇣
              {Math.abs(
                coinData.market_data.price_change_percentage_24h
              ).toFixed(2)}
              %{SVGs["24h"]}
            </p>
          ) : (
            <p className="text-green-300">
              ⇡
              {Math.abs(
                coinData.market_data.price_change_percentage_24h
              ).toFixed(2)}
              %{SVGs["24h"]}
            </p>
          )}
        </div>
      </div>

      {/* 24h Range */}
      <div className="relative mt-2 mb-10 w-full h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full text-sm">
        <div
          className="absolute top-0 right-0 h-2 rounded-full bg-gray-800 mask-l-from-80%"
          style={{ width: `${barToHigh}%` }}
        ></div>
        <div className="mt-2 flex justify-between">
          <p>${formatter2.format(coinData.market_data.low_24h.usd)}</p>
          <p>24H-Range</p>
          <p>${formatter2.format(coinData.market_data.high_24h.usd)}</p>
        </div>
      </div>

      {/* Watchlist button */}
      <div className="flex w-full">
        <button
          className={`p-2 mx-2 mb-5 w-full flex justify-between rounded-lg text-left cursor-pointer tooltip-container hover:scale-102 active:translate-y-1 active:scale-98 duration-300 ${
            isWatched(coinData.id) ? "bg-gray-600" : "bg-green-600"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCoin(coinData.id);
          }}
        >
          {isWatched(coinData.id) ? (
            <span className="tooltip text-xs">
              Click to <i className="text-red-300">REMOVE</i>
            </span>
          ) : (
            <span className="tooltip text-xs">
              Click to <i className="text-green-300">ADD</i>
            </span>
          )}
          <span className="text-sm my-auto">
            {isWatched(coinData.id) ? "★ Watchlist" : "☆ Watchlist"}
          </span>
          <span className="text-sm my-auto">
            <span className="my-auto animate-pulse text-xs text-blue-300">
              ⏺
            </span>
            <span className="text-sm my-auto">
              {formatter.format(coinData.watchlist_portfolio_users)}
              {SVGs.user}
              Added
            </span>
          </span>
        </button>
      </div>

      {/* Market Data List */}
      <div className="w-full flex flex-col text-md">
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Market Cap</p>
          <p>${formatter.format(coinData.market_data.market_cap.usd)}</p>
        </div>
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Fully Diluted Valuation</p>
          <p>
            $
            {formatter.format(coinData.market_data.fully_diluted_valuation.usd)}
          </p>
        </div>
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">24 Hour Trading Vol</p>
          <p>${formatter.format(coinData.market_data.total_volume.usd)}</p>
        </div>
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Circulating Supply</p>
          <p>{formatter.format(coinData.market_data.circulating_supply)}</p>
        </div>
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Total Supply</p>
          <p>{formatter.format(coinData.market_data.total_supply)}</p>
        </div>
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Max Supply</p>
          <p>
            {coinData.market_data.max_supply_infinite
              ? "∞"
              : formatter.format(coinData.market_data.max_supply)}
          </p>
        </div>
      </div>

      {/* Info Section List */}
      <div className="mt-10 w-full flex flex-col">
        <h3 className="text-center text-2xl">General Information</h3>
        {/* Website */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Website</p>
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Explorers</p>
          <div className="flex items-end gap-2">
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Community</p>
          <div className="flex items-end gap-2">
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Search on</p>
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Source Code</p>
          <div className="flex items-end gap-2">
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">API ID</p>
          <p className="font-mono">{coinData.id}</p>
        </div>
        {/* Chains (asset platform) – null for Bitcoin, otherwise show platform name */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Chains</p>
          <p>{coinData.asset_platform_id || "Own chain"}</p>
        </div>
        {/* Categories */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Categories</p>
          <div className="flex flex-wrap justify-end gap-1">
            {visibleCategories.map((cat) => (
              <span
                key={cat}
                className="bg-cyan-900 text-cyan-200 px-2 py-0.5 rounded-full text-xs"
              >
                {cat}
              </span>
            ))}
            {hasMore && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-cyan-300 text-xs underline hover:text-cyan-100 cursor-pointer duration-300"
              >
                {showAllCategories ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Historical Price */}
      <div className="mt-10 w-full flex flex-col">
        <h3 className="text-center text-2xl">Historical Price</h3>
        {/* 24h Range */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">24h Range</p>
          <p>
            ${formatter2.format(coinData.market_data.low_24h.usd)} – $
            {formatter2.format(coinData.market_data.high_24h.usd)}
          </p>
        </div>
        {/* All-Time High */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">All-Time High</p>
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">All-Time Low</p>
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
        <h3 className="text-center text-2xl">Chain Overview</h3>
        {/* Launch Date */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Launch Date</p>
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
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Hashing Algorithm</p>
          <p>{coinData.hashing_algorithm || "N/A"}</p>
        </div>
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Block Time</p>
          <p>
            {coinData.block_time_in_minutes
              ? `${coinData.block_time_in_minutes} minutes`
              : "N/A"}
          </p>
        </div>
        {/* Community Sentiment (votes) */}
        <div className="w-full flex justify-between border-b border-white/50 py-1">
          <p className="text-gray-300">Community Sentiment</p>
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
          <div className="w-full flex justify-between border-b border-white/50 py-1">
            <p className="text-gray-300">Reddit Subscribers</p>
            <p>{coinData.community_data.reddit_subscribers.toLocaleString()}</p>
          </div>
        )}
        {/* Reddit Active Accounts (48h) */}
        {coinData.community_data?.reddit_accounts_active_48h > 0 && (
          <div className="w-full flex justify-between border-b border-white/50 py-1">
            <p className="text-gray-300">Reddit Active Accounts (48h)</p>
            <p>
              {coinData.community_data.reddit_accounts_active_48h.toLocaleString()}
            </p>
          </div>
        )}
        {/* Reddit Average Posts (48h) */}
        {coinData.community_data?.reddit_average_posts_48h > 0 && (
          <div className="w-full flex justify-between border-b border-white/50 py-1">
            <p className="text-gray-300">Reddit Posts (48h avg)</p>
            <p>{coinData.community_data.reddit_average_posts_48h}</p>
          </div>
        )}
        {/* Reddit Average Comments (48h) */}
        {coinData.community_data?.reddit_average_comments_48h > 0 && (
          <div className="w-full flex justify-between border-b border-white/50 py-1">
            <p className="text-gray-300">Reddit Comments (48h avg)</p>
            <p>{coinData.community_data.reddit_average_comments_48h}</p>
          </div>
        )}
        {/* Facebook Likes */}
        {coinData.community_data?.facebook_likes != null && (
          <div className="w-full flex justify-between border-b border-white/50 py-1">
            <p className="text-gray-300">Facebook Likes</p>
            <p>{coinData.community_data.facebook_likes.toLocaleString()}</p>
          </div>
        )}
        {/* Telegram Channel Users */}
        {coinData.community_data?.telegram_channel_user_count != null && (
          <div className="w-full flex justify-between border-b border-white/50 py-1">
            <p className="text-gray-300">Telegram Users</p>
            <p>
              {coinData.community_data.telegram_channel_user_count.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsCol;
