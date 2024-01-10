// NOTE: See docs at https://openweathermap.org/api/one-call-3
export const OPEN_WEATHER_MAP_API = {
  KEY: import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY,
  URL: "http://api.openweathermap.org",
};

// NOTE: See docs at https://www.weatherapi.com/docs/
export const WEATHER_API = {
  KEY: import.meta.env.VITE_WEATHER_API_KEY,
  URL: "http://api.weatherapi.com/v1",
};

// NOTE: See docs at https://open-meteo.com/en/docs
export const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1";

// TODO: Add weather icons
//   - Retrieve weather codes from OpenMeteo API
//   - Take matching icons from ~/Downloads/weather/64x64/ and upscale them at
//     https://imgupscaler.com/
//   - Save them to `public/weather` folder
//   - Use them with each weather code
