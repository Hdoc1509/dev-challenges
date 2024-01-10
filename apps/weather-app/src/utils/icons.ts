export const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sleet":
      return "sleet.png";
    case "snow":
      return "snow.png";
    default:
      return "clear.png";
  }
};
