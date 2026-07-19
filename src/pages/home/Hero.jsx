"use client";

import { useEffect, useRef } from "react";
import GradientTitle from "../../ui/GradientTitle";

function Header() {
  return (
    <div
      id="#"
      className="pt-10 pb-25 rounded-t-3xl"
    >
      <p className="text-cyan-500 text-4xl w-3/5 font-light text-center select-none z-10">
        Welcome to
      </p>

      <GradientTitle text={"Cryptionary"} />

      <p className="text-gray-100 text-2xl text-right w-4/5 pb-30 select-none">
        Everything you need around{" "}
        <i className="text-blue-400 font-extrabold text-shadow-md text-shadow-black">
          Crypto
        </i>
      </p>
    </div>
  );
}

export default Header;
