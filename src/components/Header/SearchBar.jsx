function SearchBar() {
  return (
    <div className="flex w-1/2 m-0.5">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="my-auto p-0.5 w-full h-9 text-[13px] text-white text-center rounded-full border-1 border-fuchsia-300 focus:outline-0"
      />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className="w-8 m-2 hover:cursor-pointer text-gray-300"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
