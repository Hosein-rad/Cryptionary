import { SidebarSVGs } from "./SidebarSVGs";

function Sidebar() {
  return (
    <div className="flex flex-col top-12 items-center bg-gray-600 w-14 h-dvh fixed">
      <div>{SidebarSVGs.expand}</div>
      {SidebarSVGs.markets}
      {SidebarSVGs.exchanges}
      {SidebarSVGs.wallets}
      <div className="mx-auto my-1 w-10/12 h-0.5 bg-gray-300 rounded-full"></div>
      {SidebarSVGs.convert}
      {SidebarSVGs.compare}
      {SidebarSVGs.portfolioTracker}
      {SidebarSVGs.watchlist}
      <div className="mx-auto my-1 w-10/12 h-0.5 bg-gray-300 rounded-full"></div>
      {SidebarSVGs.learn}
      {SidebarSVGs.feed}
      {SidebarSVGs.about}
    </div>
  );
}

export default Sidebar;
