"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect, useMemo } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  onCycleComplete, // new prop
}) => {
  // Flatten words – unchanged
  const chars = useMemo(() => {
    const result = [];
    words.forEach((word, wordIndex) => {
      const chars = word.text.split("");
      chars.forEach((char) => {
        result.push({ char, className: word.className || "" });
      });
      if (wordIndex < words.length - 1) {
        result.push({ char: " ", className: "" });
      }
    });
    return result;
  }, [words]);

  const [visibleCount, setVisibleCount] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    let isMounted = true;

    const type = () => {
      if (!isMounted) return;
      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        let current = 0;
        const total = chars.length;

        const typeNext = () => {
          if (!isMounted) return;
          if (current < total) {
            setVisibleCount(current + 1);
            current++;
            timeoutId = setTimeout(typeNext, 40);
          } else {
            setIsTypingComplete(true);
            timeoutId = setTimeout(() => {
              if (!isMounted) return;
              erase();
            }, 5000);
          }
        };

        const erase = () => {
          if (!isMounted) return;
          let current = total;
          const eraseNext = () => {
            if (!isMounted) return;
            if (current > 0) {
              setVisibleCount(current - 1);
              current--;
              timeoutId = setTimeout(eraseNext, 40);
            } else {
              setIsTypingComplete(false);
              // ---- Call the parent callback before restarting ----
              if (onCycleComplete) {
                onCycleComplete();
              }
              timeoutId = setTimeout(() => {
                if (!isMounted) return;
                type();
              }, 1000);
            }
          };
          eraseNext();
        };

        typeNext();
      }, 1000);
    };

    type();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [chars, onCycleComplete]);

  const visibleChars = chars.slice(0, visibleCount);

  return (
    <div
      className={cn(
        `text-base sm:text-lg md:text-xl lg:text-3xl font-bold text-center inline-flex items-center`,
        className
      )}
    >
      <span>
        {visibleChars.map((item, index) => (
          <span key={index} className={cn("inline-block", item.className)}>
            {item.char === " " ? "\u00A0" : item.char}
          </span>
        ))}
      </span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[3px] h-4 md:h-6 lg:h-10 bg-blue-500 ml-[2px]",
          cursorClassName
        )}
      />
    </div>
  );
};
