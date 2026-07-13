// components/Sparkline.jsx
import { useMemo } from "react";

// Internal coordinate system (not pixels)
const COORD_WIDTH = 60;
const COORD_HEIGHT = 15;
const PADDING = 5;

export default function Sparkline({
  currentPrice,
  percentChanges,
  className = "",
}) {
  const lineData = useMemo(() => {
    if (!currentPrice || !percentChanges) return null;

    // Intervals from oldest to newest
    const intervals = [
      { pct: percentChanges.percent_change_1y ?? 0 },
      { pct: percentChanges.percent_change_200d ?? 0 },
      { pct: percentChanges.percent_change_30d ?? 0 },
      { pct: percentChanges.percent_change_14d ?? 0 },
      { pct: percentChanges.percent_change_7d ?? 0 },
      { pct: percentChanges.percent_change_24h ?? 0 },
    ];

    const pastPrices = intervals.map(
      ({ pct }) => currentPrice / (1 + pct / 100)
    );
    const allPrices = [...pastPrices, currentPrice];

    // Trend colour
    const isUp = currentPrice >= pastPrices[0];
    const color = isUp ? "#36cd96" : "#ff6384";

    // Normalise within coordinate system
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const range = max - min || 1;

    const points = allPrices
      .map((price, i) => {
        const x =
          (i / (allPrices.length - 1)) * (COORD_WIDTH - PADDING * 2) + PADDING;
        const y =
          COORD_HEIGHT -
          PADDING -
          ((price - min) / range) * (COORD_HEIGHT - PADDING * 2);
        return `${x},${y}`;
      })
      .join(" ");

    const lastPoint = allPrices.length - 1;
    const lastX =
      (lastPoint / lastPoint) * (COORD_WIDTH - PADDING * 2) + PADDING;
    const lastY =
      COORD_HEIGHT -
      PADDING -
      ((allPrices[lastPoint] - min) / range) * (COORD_HEIGHT - PADDING * 2);

    return { points, color, lastX, lastY };
  }, [currentPrice, percentChanges]);

  return (
    <svg
      viewBox={`0 0 ${COORD_WIDTH} ${COORD_HEIGHT}`}
      className={`w-4/5 h-4/5 ${className}`}
      preserveAspectRatio="none" // stretches to fill container (we want to fit cell exactly)
    >
      {lineData && (
        <>
          <polyline
            points={lineData.points}
            fill="none"
            stroke={lineData.color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={lineData.lastX}
            cy={lineData.lastY}
            r={0.7}
            fill={lineData.color}
            vectorEffect="non-scaling-stroke"
          />
        </>
      )}
    </svg>
  );
}
