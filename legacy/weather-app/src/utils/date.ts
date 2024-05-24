export const formatDate = (date: Date) => {
  const [weekday, month, day] = date
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .split(" ");

  return `${weekday} ${day} ${month}`;
};

export const parseDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const getCurrentDate = () => {
  return formatDate(new Date());
};
