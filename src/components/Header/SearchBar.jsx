import { HeaderSVGs } from "./HeaderSVGs";

function SearchBar() {
  return (
    <div className="flex w-1/2 m-0.5">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="my-auto p-0.5 w-full h-9 text-[13px] text-white text-center rounded-full border-1 border-fuchsia-300 focus:outline-0"
      />
      <div>{HeaderSVGs.Search}</div>
    </div>
  );
}

export default SearchBar;
