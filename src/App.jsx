import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Currencies from "./pages/explore/currencies";

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Currencies />
      </div>
    </>
  );
}

export default App;
