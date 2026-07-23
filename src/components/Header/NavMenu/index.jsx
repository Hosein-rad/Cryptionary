"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SVGs } from "./SVGs";
import { useClickAway } from "../../../hooks/onClickAway/page";

// Gradients for each item (same as the circular example)
const gradients = [
  "linear-gradient(45deg, #62daca, #10d4a9)",
  "linear-gradient(45deg, #f97d98, #d41f46)",
  "linear-gradient(45deg, aliceblue, #d169d1)",
  "linear-gradient(45deg, #fddb92, #d1fdff)",
  "linear-gradient(45deg, #89f7fe, #66a6ff)",
];

const menuItems = [
  { path: "/", icon: "home", label: "Home" },
  { path: "/CoinDetail", icon: "coin-info", label: "Coin info" },
  { path: "/Converter", icon: "convert", label: "Converter" },
  { path: "/Watchlist", icon: "watchlist", label: "Watchlist" },
  { path: "/About", icon: "about", label: "About" },
];

function NavMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useClickAway(() => setIsOpen(false));

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={ref}
      className="h-ful w-10 mt-1 ml-2 z-100 flex flex-col items-end cursor-pointer"
    >
      {/* Menu Toggle Button */}
      <button
        onClick={toggleOpen}
        className={`
          menu-toggle
          relative size-8 sm:size-10 rounded-full bg-sky-200 text-2xl font-bold cursor-pointer
          flex items-center justify-center
          transition-transform duration-1000 ease-in-out
          ${isOpen ? "rotate-325" : "rotate-0"}
        `}
        aria-label="Toggle menu"
      >
        <span className="block">{SVGs.menu}</span>
        {/* Glow behind button */}
        <span className="absolute inset-0 rounded-full bg-white/60 blur-lg -z-10" />
      </button>

      {/* Menu items – vertical cascade with stagger */}
      <div
        className={`
          menu-items-container
          relative mt-1 md:mt-3 flex flex-col items-end gap-1 md:gap-2
          ${isOpen ? "open" : ""}
        `}
      >
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`
              menu-item
              relative flex items-center sm:gap-1 md:gap-3 p-1 sm:p-2 
              rounded-full text-black font-medium
              transition-all duration-500
              hover:scale-105 active:scale-95
              group
              ${({ isActive }) =>
                isActive
                  ? "ring-2 ring-white ring-offset-2 ring-offset-cyan-800"
                  : ""}
            `}
            style={{
              background: gradients[index % gradients.length],
              transitionDelay: `${index * 80}ms`,
            }}
          >
            {/* text and Icon */}
            <span className="text-xs md:text-sm tracking-wide">
              {item.label}
            </span>
            <span className="w-6 h-6 flex items-center justify-center">
              {SVGs[item.icon] || item.icon}
            </span>

            {/* Glow behind the item (expands on hover) */}
            <span
              className="menu-item-glow"
              style={{
                background: gradients[index % gradients.length],
                filter: "blur(20px) saturate(200%) opacity(0.8)",
              }}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default NavMenu;
