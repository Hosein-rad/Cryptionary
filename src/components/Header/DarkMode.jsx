import { useState } from "react";
import { HeaderSVGs } from "./HeaderSVGs";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <>
      {darkMode ? (
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="my-auto mx-2 size-8 flex justify-center items-center rounded-full bg-cyan-800 shadow-cyan-800 shadow-[0_0_10px_7px] active:scale-50 duration-300"
        >
          {HeaderSVGs.moon}
        </div>
      ) : (
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="my-auto mx-2 size-8 flex justify-center items-center rounded-full bg-cyan-200 shadow-cyan-200 shadow-[0_0_12px_5px] active:scale-50 duration-300"
        >
          {HeaderSVGs.sun}
        </div>
      )}
    </>
  );
}

export default DarkMode;
