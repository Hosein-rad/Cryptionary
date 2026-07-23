"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function TopCoins({ data }) {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const isVisibleRef = useRef(false);
  const textRef = useRef("");
  const navigate = useNavigate();

  const handleMouseMove = useCallback((event) => {
    if (!isVisibleRef.current) return;
    if (tooltipRef.current) {
      tooltipRef.current.style.top = `${event.pageY - 50}px`;
      tooltipRef.current.style.left = `${event.pageX}px`;
      tooltipRef.current.style.transform = "translateX(-50%)";
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const coins = data?.coins;
  if (!coins || !Array.isArray(coins)) return null;

  const jsx = coins.slice(0, 7).map((coin) => (
    <div
      onClick={() => navigate(`/coin/${coin.item.id}`)}
      key={coin.item.coin_id}
      className="relative m-2 border-none hover:scale-110 rounded-full duration-150 cursor-pointer"
    >
      <img
        src={coin.item.small || "/cryptionary-icon.png"}
        loading="lazy"
        alt={coin.item.name + " Logo"}
        className="size-8 md:size-20 border-none rounded-full shadow-gray-500 shadow-lg hover:shadow-gray-700 duration-500"
        onMouseEnter={() => {
          textRef.current = coin.item.name;
          isVisibleRef.current = true;
          setText(coin.item.name);
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          isVisibleRef.current = false;
          setText("");
          setIsVisible(false);
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/cryptionary-icon.png";
        }}
      />
    </div>
  ));

  return (
    <div className="md:mx-4 mt-2 flex flex-wrap justify-center items-center">
      {jsx}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="p-1 absolute text-md font-bold pointer-events-none border-2 border-black bg-white opacity-50 rounded-md"
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default TopCoins;
