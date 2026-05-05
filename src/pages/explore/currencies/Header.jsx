"use client";

import { useEffect, useRef } from "react";

function Header() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const stars = [];

  const newRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return r + "," + g + "," + b;
  };

  // const newClassName = () => {
  //   const top = Math.floor(Math.random() * 120) + 20;
  //   const left = Math.floor(Math.random() * 280) + 20;
  //   const textSize = Math.floor(Math.random() * 200);
  //   return `absolute top-${top} left-${left} text-[${textSize}px] text-[rgb(${newRGB()})]`;
  // };
  // const createStar = () => {
  //   const top = Math.floor(Math.random() * 500) + 80;
  //   const left = Math.floor(Math.random() * 1120) + 80;
  //   const newStar = document.createElement("div");
  //   newStar.className = "animate-pulse duration-500";
  //   newStar.innerText = "*";
  //   newStar.style.color = `rgb(${newRGB()})`;
  //   newStar.style.position = "absolute";
  //   newStar.style.top = top + "px";
  //   newStar.style.left = left + "px";
  //   newStar.style.animation = "ping 1s linear";
  //   document.body.appendChild(newStar);
  //   setTimeout(() => newStar.remove(), 3000);
  // };
  // useEffect(() => {
  //   setInterval(createStar, 200);
  // });

  useEffect(() => {
    function changeBG() {
      const deg = Math.floor(Math.random() * 360);
      return `linear-gradient(${deg}deg,rgb(${newRGB()})0%,rgb(${newRGB()})25%,rgb(${newRGB()})50%,rgb(${newRGB()})75%,rgb(${newRGB()})100%)`;
    }
    const gradientInterval = () => {
      if (ref.current) {
        ref.current.style.transition = "opacity 3s ease-in-out";
        ref2.current.style.transition = "opacity 3s ease-in-out";
        ref2.current.style.backgroundImage = changeBG();
        ref2.current.style.opacity = 0;
        ref.current.style.opacity = 1;
        setInterval(() => {
          if (ref.current.style.opacity == 1) {
            ref2.current.style.backgroundImage = changeBG();
            ref.current.style.opacity = 0;
            ref2.current.style.opacity = 1;
          } else if (ref.current.style.opacity == 0) {
            ref.current.style.backgroundImage = changeBG();
            ref.current.style.opacity = 1;
            ref2.current.style.opacity = 0;
          }
        }, 3000);
      }
    };
    gradientInterval();
    return () => clearInterval(gradientInterval);
  }, []);

  return (
    <div
      className="pt-10 pb-25 rounded-t-3xl border-b-10 border-black"
      style={{
        backgroundImage: `url("https://ghab24.com/movafaghiat/media/appmedia/image/GHAB%20MEDIA%20DESKTOP%20745-min.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        height: "100%",
      }}
    >
      {stars.map((item) => item)}

      <p className="text-cyan-500 text-4xl w-3/5 font-light text-center select-none z-10">
        Welcome to
      </p>
      <div className="relative -mt-20 pt-10 pb-45 w-6/7 px-30 mx-auto h-40 rounded-br-full border-black border-b-6 mask-l-from-85%">
        <div
          ref={ref}
          className="z-10 pt-13 font-medium absolute w-fit text-8xl bg-clip-text text-transparent bg-[linear-gradient(45deg,rgb(223,30,103)0%,rgb(54,205,150)50%,rgb(100,17,192)100%)] opacity-0 pointer-events-none font-['Gorehand'] select-none"
        >
          Cryptionary
        </div>
        <div
          ref={ref2}
          className="absolute pt-13 font-medium w-fit text-8xl  bg-clip-text text-transparent pointer-events-none font-['Gorehand'] select-none"
        >
          Cryptionary
        </div>
      </div>
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
