export const getWeatherIcon = (weatherCode: number): string => {
  if (weatherCode === 1000 || weatherCode === 0) return "clear";
  if (
    weatherCode === 1135 ||
    weatherCode === 1147 ||
    weatherCode === 45 ||
    weatherCode === 48
  )
    return "fog";
  if (weatherCode === 96 || weatherCode === 99) return "hail";
  if (weatherCode === 1006 || weatherCode === 1009 || weatherCode === 3)
    return "heavy-cloud";
  if (weatherCode === 1192 || weatherCode === 1195 || weatherCode === 65)
    return "heavy-rain";
  if (weatherCode === 1003 || weatherCode === 1 || weatherCode === 2)
    return "light-cloud";
  if (
    weatherCode === 1063 ||
    weatherCode === 1180 ||
    weatherCode === 1183 ||
    weatherCode === 1186 ||
    weatherCode === 1189 ||
    weatherCode === 61 ||
    weatherCode === 63
  )
    return "light-rain";
  if (
    weatherCode === 1240 ||
    weatherCode === 1243 ||
    weatherCode === 1246 ||
    weatherCode === 1261 ||
    weatherCode === 1264 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82 ||
    weatherCode === 85 ||
    weatherCode === 86
  )
    return "shower";
  if (
    weatherCode === 1069 ||
    weatherCode === 1204 ||
    weatherCode === 1207 ||
    weatherCode === 1249 ||
    weatherCode === 1252
  )
    return "sleet";
  if (
    weatherCode === 1066 ||
    weatherCode === 1114 ||
    weatherCode === 1210 ||
    weatherCode === 1213 ||
    weatherCode === 1216 ||
    weatherCode === 1219 ||
    weatherCode === 1222 ||
    weatherCode === 1225 ||
    weatherCode === 1255 ||
    weatherCode === 1258 ||
    weatherCode === 1279 ||
    weatherCode === 1282 ||
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75
  )
    return "snow";
  if (weatherCode === 1087 || weatherCode === 1273 || weatherCode === 1276)
    return "thunderstorm";
  return "clear";
};
