"use client";

import { useState } from "react";
import { SidebarSVGs } from "./SidebarSVGs";
import IconItem from "./IconItem";
import { useClickAway } from "../../hooks/onClickAway/page";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [expand, setExpand] = useState("-translate-x-26");
  const ref = useClickAway(() => {
    setExpand("-translate-x-26");
  });
  return (
    <div
      ref={ref}
      onSuspendCapture={() => setExpand("-translate-x-26")}
      className={`w-40 px-2 pt-3 flex flex-col top-20 items-end justify-baseline gap-1 bg-cyan-800 rounded-tr-2xl h-dvh fixed ${expand} duration-500 z-100`}
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
      <NavLink to="/">{IconItem("home")}</NavLink>
      <div className="mx-auto my-1 w-5/6 h-0.5 bg-gray-300 rounded-full"></div>
      <NavLink to="/coinDetail">{IconItem("convert")}</NavLink>
      <NavLink to="/convert">{IconItem("convert")}</NavLink>
      <NavLink to="/compare">{IconItem("compare")}</NavLink>
      <NavLink to="/watchlist">{IconItem("watchlist")}</NavLink>
      <div className="mx-auto my-1 w-5/6 h-0.5 bg-gray-300 rounded-full"></div>
      <NavLink to="/about">{IconItem("about")}</NavLink>
    </div>
  );
}

export default Sidebar;

// import { NavLink } from "react-router-dom";
// import { SidebarSVGs } from "./SidebarSVGs";
// import IconItem from "./IconItem"; // assume this returns a styled icon+label
// import { useClickAway } from "../../hooks/onClickAway/page";
// import { useState } from "react";

// export default function Sidebar() {
//   const [expand, setExpand] = useState("-translate-x-26");
//   const ref = useClickAway(() => setExpand("-translate-x-26"));

//   return (
//     <div ref={ref} className={`...your classes... ${expand}`}>
//       {/* Expand/collapse button */}
//       <div onClick={() => setExpand((prev) => (prev ? "" : "-translate-x-26"))}>
//         {SidebarSVGs.expand}
//       </div>

//       {/* Navigation links – these control the URL, not the route rendering */}
//       <NavLink to="/" className="...active styling...">
//         <IconItem icon="home" label="Home" />
//       </NavLink>
//       <NavLink to="/convert">
//         <IconItem icon="convert" label="Convert" />
//       </NavLink>
//       <NavLink to="/compare">
//         <IconItem icon="compare" label="Compare" />
//       </NavLink>
//       {/* ...etc... */}
//     </div>
//   );
// }
