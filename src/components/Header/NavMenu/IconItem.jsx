import { SidebarSVGs } from "./SidebarSVGs";

function IconItem(item) {
  return (
    <div className="flex items-center justify-between cursor-pointer bg-cyan-500 rounded-lg">
      <p className="mx-3 text-white font-medium text-shadow-lg hover:text-shadow-black hover:scale-102 duration-200">
        {String(item).toUpperCase()}
      </p>
      <div className="pr-1 hover:rotate-y-180 hover:scale-130 duration-500">
        {SidebarSVGs[item]}
      </div>
    </div>
  );
}

export default IconItem;
