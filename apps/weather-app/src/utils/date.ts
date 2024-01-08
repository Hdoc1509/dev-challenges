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

export const getCurrentDate = () => {
  return formatDate(new Date());
};
