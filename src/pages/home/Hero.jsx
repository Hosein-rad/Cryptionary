"use client";

import { useState } from "react";
import GradientTitle from "../../ui/GradientTitle";
import { TypewriterEffect } from "../../ui/typewriter-effect";

// Define your 3 phrases (each is an array of word objects)
const phrases = [
  [
    { text: "Everything " },
    { text: "you " },
    { text: "need " },
    { text: "around " },
    {
      text: "Crypto",
      className:
        "text-blue-400 font-extrabold text-shadow-md text-shadow-black",
    },
  ],
  [
    { text: "Track " },
    { text: "prices " },
    { text: "in " },
    {
      text: "real-time",
      className:
        "text-green-400 font-extrabold text-shadow-md text-shadow-black",
    },
  ],
  [
    { text: "Convert " },
    { text: "any " },
    { text: "currency " },
    {
      text: "instantly",
      className: "text-red-400 font-extrabold text-shadow-md text-shadow-black",
    },
  ],
  [
    { text: "Save " },
    { text: "your " },
    { text: "favorite " },
    { text: "coins " },
    { text: "in " },
    {
      text: "one ",
      className:
        "text-purple-400 font-extrabold text-shadow-md text-shadow-black",
    },
    {
      text: "place",
      className:
        "text-purple-400 font-extrabold text-shadow-md text-shadow-black",
    },
  ],
];

function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  const handleCycleComplete = () => {
    setPhraseIndex((prev) => (prev + 1) % phrases.length);
  };

  return (
    <div
      id="#"
      className="pt-40 md:pt-35 lg:pt-45 xl:pt-25 pb-25 rounded-t-3xl"
    >
      <p className="text-cyan-500/50 text-2xl md:text-5xl w-3/5 font-light text-center font-['Gorehand'] select-none z-10">
        Welcome <br className="block lg:hidden" />
        to
      </p>
      <div className="w-full lg:w-9/10 mx-auto rounded-br-full border-black border-b-6 mask-l-from-85%">
        <GradientTitle
          text={"Cryptionary"}
          className="text-[42px] md:text-8xl lg:text-[110px] xl:text-9xl my-5"
        />
      </div>

      <div className="mt-5 text-gray-100 text-right w-9/10 md:w-4/5 pb-30 select-none">
        <TypewriterEffect
          words={phrases[phraseIndex]}
          onCycleComplete={handleCycleComplete}
        />
      </div>
    </div>
  );
}

export default Hero;
