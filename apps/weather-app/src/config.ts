// NOTE: See docs at https://www.weatherapi.com/docs/
export const WEATHER_API = {
  KEY: import.meta.env.VITE_WEATHER_API_KEY,
  URL: "http://api.weatherapi.com/v1",
};

// NOTE: See docs at https://open-meteo.com/en/docs
export const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1";

// TODO: Add better weather icons
//   - Retrieve weather codes from OpenMeteo API
//   - Take matching icons from https://www.weatherapi.com/docs/#weather-icons
//   - Upscale the icons at https://imgupscaler.com and save them to `public/weather` folder
//   - Use them with each weather code
