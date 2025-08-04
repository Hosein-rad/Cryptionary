import { SVGs } from "./SVGs";

function Sidebar() {
  return (
    <div className="flex flex-col items-center w-14 h-dvh bg-gray-600">
      <div>{SVGs.expand}</div>
      {SVGs.markets}
      {SVGs.exchanges}
      {SVGs.wallets}
      <div className="mx-auto my-1 w-10/12 h-0.5 bg-gray-300 rounded-full"></div>
      {SVGs.convert}
      {SVGs.compare}
      {SVGs.portfolioTracker}
      {SVGs.watchlist}
      <div className="mx-auto my-1 w-10/12 h-0.5 bg-gray-300 rounded-full"></div>
      {SVGs.learn}
      {SVGs.feed}
      {SVGs.about}
    </div>
  );
}

export default Sidebar;
