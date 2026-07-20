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
    <div id="#" className="pt-20 pb-25 rounded-t-3xl">
      <p className="text-cyan-500/50 text-4xl w-3/5 font-light text-center font-['Gorehand'] select-none z-10">
        Welcome to
      </p>
      <div className="w-9/10 mx-auto rounded-br-full border-black border-b-6 mask-l-from-85%">
        <GradientTitle text={"Cryptionary"} className="text-9xl my-5" />
      </div>

      <p className="mt-5 text-gray-100 text-2xl text-right w-4/5 pb-30 select-none">
        <TypewriterEffect
          words={phrases[phraseIndex]}
          onCycleComplete={handleCycleComplete}
        />
      </p>
    </div>
  );
}

export default Hero;
