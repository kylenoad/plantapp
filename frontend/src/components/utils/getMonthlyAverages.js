export function getMonthlyAverages(data) {
  
  const monthlyTotals = {};

  for (let i = 0; i < data.length; i++) {

    const timestamp = data[i].timestamp;
    const moisture_level = data[i].moisture_level;
    const date = new Date(timestamp);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = { sum: 0, count: 0 };
    }

    monthlyTotals[key].sum += moisture_level;
    monthlyTotals[key].count += 1;
  }

  const result = [];

  for (const key in monthlyTotals) {
    const parts = key.split("-");
    const year = parts[0];
    const month = parts[1];
    const average = monthlyTotals[key].sum / monthlyTotals[key].count;

    result.push({
      timestamp: new Date(year, month - 1, 1),
      moisture_level: average,
    });
  }

  return result;
}
