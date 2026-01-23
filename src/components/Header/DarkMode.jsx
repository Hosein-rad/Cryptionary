import { useState } from "react";
import { HeaderSVGs } from "./HeaderSVGs";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? HeaderSVGs.moon : HeaderSVGs.sun}
    </div>
  );
}

export default DarkMode;
