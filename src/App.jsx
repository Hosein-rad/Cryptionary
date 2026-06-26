import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/home";
import Compare from "./pages/compare";
import CoinDetail from "./pages/CoinDetail/Index";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";

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
      { path: "/CoinDetail/:coinId", element: <CoinDetail /> },
      { path: "/compare", element: <Compare /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
