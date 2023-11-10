export default {
  continents: ["africa", "americas", "asia", "europe", "oceania"],
  endpoints: {
    continent: (continent) =>
      `https://restcountries.com/v3.1/region/${continent}`,
    language: (lang) => `https://restcountries.com/v3.1/lang/${lang}`,
    country: (country) => `https://restcountries.com/v3.1/name/${country}`,
  },
};
