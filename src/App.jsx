import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import Converter from "./pages/Converter";
import CoinDetail from "./pages/CoinDetail/Index";
import Watchlist from "./pages/Watchlist";
import About from "./pages/about";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import "./lib/chartSetup";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <ScrollRestoration />
        <Header />
        <Sidebar />
        <main className="mt-15 ml-15 flex font-mono rounded-tl-2xl overflow-hidden">
          <Outlet />
        </main>
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/coin/:coinId", element: <CoinDetail /> },
      { path: "/CoinDetail", element: <CoinDetail /> },
      { path: "/Converter", element: <Converter /> },
      { path: "/Watchlist", element: <Watchlist /> },
      { path: "/About", element: <About /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
