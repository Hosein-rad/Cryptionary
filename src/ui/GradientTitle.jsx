"use client";

import { useEffect, useRef } from "react";

// Randomized Colors and Gradients for the Hero title
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

export default function GradientTitle({ text }) {
  const refA = useRef(null); // one text element
  const refB = useRef(null); // the other
  const intervalRef = useRef(null);
  // Track which layer is currently visible (true = A, false = B)
  const visibleA = useRef(true);

  useEffect(() => {
    const elA = refA.current;
    const elB = refB.current;
    if (!elA || !elB) return;

    // Initial setup
    elA.style.transition = "opacity 3s ease-in-out";
    elB.style.transition = "opacity 3s ease-in-out";
    elA.style.backgroundImage = randomGradient();
    elB.style.backgroundImage = randomGradient();
    elA.style.opacity = 1;
    elB.style.opacity = 0;
    visibleA.current = true;

    // toggle between the 2 'text' props
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
    <div className="relative -mt-10 pb-55 w-6/7 px-20 mx-auto h-40 rounded-br-full border-black border-b-6 mask-l-from-85%">
      <div
        ref={refA}
        className="z-10 pt-13 font-medium absolute w-fit text-9xl bg-clip-text text-transparent pointer-events-none font-['Gorehand'] select-none"
      >
        {text}
      </div>
      <div
        ref={refB}
        className="absolute pt-13 font-medium w-fit text-9xl bg-clip-text text-transparent pointer-events-none font-['Gorehand'] select-none"
      >
        {text}
      </div>
    </div>
  );
}
