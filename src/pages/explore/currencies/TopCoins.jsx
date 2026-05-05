"use client";

import { useState, useRef } from "react";
import TrendingCoins from "../../../data/CoinGecko-Trendings.json";

function TopCoins() {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  let jsx = [];

  const mouseLocation = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    if (ref.current) {
      ref.current.style.top = `${y - 50}px`;
      ref.current.style.left = `${x - 50}px`;
    }
  };

  for (let x = 0; x < Object.keys(TrendingCoins.coins).length; x++) {
    jsx.push(
      <a
        href={"#"}
        key={TrendingCoins.coins[x].item.coin_id}
        className="m-2 border-none hover:scale-110 duration-150"
        onMouseLeave={() => {
          document.removeEventListener("mousemove", mouseLocation);
          setText("");
          setIsVisible(false);
        }}
      >
        <img
          onMouseEnter={() => {
            document.addEventListener("mousemove", mouseLocation);
            setText(TrendingCoins.coins[x].item.name);
            setIsVisible(true);
          }}
          onMouseLeave={() => {
            document.removeEventListener("mousemove", mouseLocation);
            setText("");
            setIsVisible(false);
          }}
          src={TrendingCoins.coins[x].item.small}
          alt={TrendingCoins.coins[x].item.name + "Logo"}
          className="size-15 border-none rounded-full shadow-gray-500 shadow-lg hover:shadow-gray-700 duration-500"
        />
      </a>
    );
  }

  return (
    <div className="mx-4 my-4 flex flex-wrap justify-center items-center">
      {jsx.map((item) => item)}
      {isVisible && (
        <div
          ref={ref}
          className="p-1 absolute text-md font-bold pointer-events-none border-2 border-black bg-white opacity-50 rounded-md"
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default TopCoins;
