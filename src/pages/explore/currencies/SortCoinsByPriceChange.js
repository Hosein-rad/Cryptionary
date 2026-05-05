import CoinPaprikaData from "../../../data/CoinPaprika-Top2k.json";

export default function SortCoinsByPriceChange(timeFrame) {
  const unsorted = [...CoinPaprikaData];
  
  const sortedArr = unsorted.sort(
    (a, b) =>
      b.quotes.USD[`percent_change_${timeFrame}`] -
      a.quotes.USD[`percent_change_${timeFrame}`]
  );

  return sortedArr;
}
