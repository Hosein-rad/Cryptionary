"use client";

import { useState } from "react";
import { SidebarSVGs } from "./SidebarSVGs";
import IconItem from "./IconItem";
import { useClickAway } from "../../hooks/onClickAway/page";

function Sidebar() {
  const [expand, setExpand] = useState("-translate-x-26");
  const ref = useClickAway(() => {
    setExpand("-translate-x-26");
  });
  return (
    <div
      ref={ref}
      onSuspendCapture={() => setExpand("-translate-x-26")}
      className={`z-100 w-40 px-2 pt-3 flex flex-col top-14 items-end justify-baseline gap-1 bg-cyan-800 rounded-tr-3xl h-dvh fixed ${expand} duration-500`}
    >
      <div
        onClick={() => {
          expand == "-translate-x-26"
            ? setExpand("")
            : setExpand("-translate-x-26");
        }}
        className={`mb-2 rounded-full bg-cyan-300 border-none  ${
          expand ? "" : "rotate-180"
        } duration-500`}
      >
        {SidebarSVGs.expand}
      </div>
      {IconItem("markets")}
      {IconItem("exchanges")}
      {IconItem("wallets")}
      <div className="mx-auto my-1 w-5/6 h-0.5 bg-gray-300 rounded-full"></div>
      {IconItem("convert")}
      {IconItem("compare")}
      {IconItem("tracker")}
      {IconItem("watchlist")}
      <div className="mx-auto my-1 w-5/6 h-0.5 bg-gray-300 rounded-full"></div>
      {IconItem("learn")}
      {IconItem("feed")}
      {IconItem("about")}
    </div>
  );
}

export default Sidebar;
