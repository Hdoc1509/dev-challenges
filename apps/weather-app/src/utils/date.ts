export const getCurrentDate = () => {
  const [weekday, month, day] = new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .split(" ");

  return `${weekday} ${day} ${month}`;
};
