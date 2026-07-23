"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function TopNFTs({ data }) {
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

  const nfts = data?.nfts;
  if (!nfts || !Array.isArray(nfts)) return null;

  const jsx = nfts.map((nft) => (
    <div
      key={nft.nft_contract_id}
      className="m-2 border-none hover:scale-110 rounded-full duration-150"
    >
      <img
        src={nft.thumb || "/cryptionary-icon.png"}
        loading="lazy"
        alt={nft.name + " Logo"}
        className="size-8 md:size-20 border-none rounded-full shadow-gray-500 shadow-lg hover:shadow-gray-800 duration-500"
        onMouseEnter={() => {
          textRef.current = nft.name;
          isVisibleRef.current = true;
          setText(nft.name);
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
          className="p-1 absolute text-md font-bold border-l-2 pointer-events-none border-2 border-black bg-white opacity-50 rounded-md"
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default TopNFTs;
