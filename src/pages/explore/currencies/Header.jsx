function Header() {
  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-5xl">TOPS</h1>
        <div className="flex flex-col justify-center items-center">
          <p>in the</p>
          <p>last</p>
        </div>
        <select
          name="timeframe"
          id="select-timeframe"
          defaultValue="24h"
          className="border-2 border-b-zinc-400 rounded-sm"
        >
          <option value="60min">60 minutes</option>
          <option value="24h">24 hours</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
          <option value="12m">12 months</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
