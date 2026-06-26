import Hero from "./Hero";
import Boxes from "./Boxes";
import CoinsList from "./CoinsList";
// import CoinImageDownloader from "./CoinImageDownloader";

function Home() {
  return (
    <div className="w-dvw h-full border-0 rounded-2xl">
      <Hero />
      <Boxes />
      <CoinsList />

      {/* Auto download coin icons */}
      {/* <CoinImageDownloader />  */}
    </div>
  );
}

export default Home;
