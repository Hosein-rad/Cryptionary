"use client";

import { useEffect, useRef } from "react";

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `${r},${g},${b}`;
};
const randomGradient = () => {
  const deg = Math.floor(Math.random() * 360);
  return `linear-gradient(${deg}deg, rgb(${randomColor()}) 0%, rgb(${randomColor()}) 25%, rgb(${randomColor()}) 50%, rgb(${randomColor()}) 75%, rgb(${randomColor()}) 100%)`;
};

export default function GradientTitle({ text, className }) {
  const refA = useRef(null);
  const refB = useRef(null);
  const intervalRef = useRef(null);

  const visibleA = useRef(true);

  useEffect(() => {
    const elA = refA.current;
    const elB = refB.current;
    if (!elA || !elB) return;

    elA.style.transition = "opacity 3s ease-in-out";
    elB.style.transition = "opacity 3s ease-in-out";
    elA.style.backgroundImage = randomGradient();
    elB.style.backgroundImage = randomGradient();
    elA.style.opacity = 1;
    elB.style.opacity = 0;
    visibleA.current = true;

    const toggle = () => {
      if (visibleA.current) {
        elB.style.backgroundImage = randomGradient();
        elA.style.opacity = 0;
        elB.style.opacity = 1;
        visibleA.current = false;
      } else {
        elA.style.backgroundImage = randomGradient();
        elA.style.opacity = 1;
        elB.style.opacity = 0;
        visibleA.current = true;
      }
    };
    toggle();

    intervalRef.current = setInterval(toggle, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className={`relative w-fit h-fit mx-auto flex items-center justify-center ${className}`}
    >
      <div
        ref={refA}
        className="z-10 w-fit bg-clip-text text-transparent pointer-events-none font-['Gorehand'] select-none"
      >
        {text}
      </div>
      <div
        ref={refB}
        className="absolute w-fit bg-clip-text text-transparent pointer-events-none font-['Gorehand'] select-none"
      >
        {text}
      </div>
    </div>
  );
}
