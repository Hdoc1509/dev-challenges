import { WEATHER_API } from "../config"
import { SearchCityResponseSchema } from "../schemas/search-city"

export const searchCity = async (search: string) => {
  const params = new URLSearchParams({
    q: search,
    limit: "5",
    key: WEATHER_API.KEY,
  })

  const res = await fetch(`${WEATHER_API.URL}/search.json?${params.toString()}`)
  const data = SearchCityResponseSchema.parse(await res.json())

  return data
}
