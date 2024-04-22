export const CSVToJSON = (data: string, delimiter = ",") => {
  const titles = data
    .slice(0, data.indexOf("\n"))
    .replace(/\r$/, "")
    .split(delimiter);
  const rows = data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map((row) => row.replace(/\r$/, "")); // Remove trailing \r

  return rows.map((row) => {
    const values = row.split(delimiter);
    return titles.reduce(
      (obj, title, index) => ({
        ...obj,
        [title]: values[index],
      }),
      {} as { [key: string]: string }
    );
  });
};
