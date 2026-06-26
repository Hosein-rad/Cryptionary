import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/home";
import Compare from "./pages/compare";
import { Routes, Route } from "react-router-dom";
import CoinDetail from "./pages/coinDetail/Index";

function App() {
  return (
    <body>
      <Header />
      <Sidebar />
      <main className="mt-20 ml-15 flex font-mono rounded-tl-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coinDetail" element={<CoinDetail />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </main>
    </body>
  );
}

export default App;
