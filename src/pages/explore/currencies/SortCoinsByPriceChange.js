import CoinPaprikaData from "../../../data/CoinPaprika-Top2k.json";

export default function SortCoinsByPriceChange(timeFrame) {
  const unsorted = [...CoinPaprikaData];

  // for (let x = 0; x < CoinPaprikaData.length; x++) {
  // unsorted[CoinPaprikaData[x].symbol] =
  //   CoinPaprikaData[x].quotes.USD[`percent_change_${timeFrame}`];
  // unsorted.push({
  //     symbol: CoinPaprikaData[x].symbol,
  //     changePercent:
  //       CoinPaprikaData[x].quotes.USD[`percent_change_${timeFrame}`],
  //   });
  // }

  // const sortedArr = Object.entries(unsorted).sort((a, b) => b[1] - a[1]);
  // const sortedArr = unsorted.sort((a, b) => b.changePercent - a.changePercent);
  const sortedArr = unsorted.sort(
    (a, b) =>
      b.quotes.USD[`percent_change_${timeFrame}`] -
      a.quotes.USD[`percent_change_${timeFrame}`]
  );

  return sortedArr;
}
