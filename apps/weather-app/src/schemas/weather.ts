import * as z from "zod";

const LocationSchema = z
  .object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime_epoch: z.number(),
    localtime: z.string(),
  })
  .transform(({ name }) => name);

const ConditionSchema = z
  .object({
    text: z.string(),
    icon: z.string(),
    code: z.number(),
  })
  .transform(({ text }) => text);

const CurrentSchema = z
  .object({
    last_updated_epoch: z.number(),
    last_updated: z.string(),
    temp_c: z.number(),
    temp_f: z.number(),
    is_day: z.number(),
    condition: ConditionSchema,
    wind_mph: z.number(),
    wind_kph: z.number(),
    wind_degree: z.number(),
    wind_dir: z.string(),
    pressure_mb: z.number(),
    pressure_in: z.number(),
    precip_mm: z.number(),
    precip_in: z.number(),
    humidity: z.number(),
    cloud: z.number(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
    vis_km: z.number(),
    vis_miles: z.number(),
    uv: z.number(),
    gust_mph: z.number(),
    gust_kph: z.number(),
  })
  .transform(
    ({
      temp_c,
      temp_f,
      condition,
      wind_mph,
      wind_degree,
      wind_dir,
      pressure_mb,
      vis_miles,
      humidity,
    }) => ({
      temperature: {
        celsius: temp_c,
        fahrenheit: temp_f,
      },
      condition,
      wind: {
        speed: wind_mph,
        direction: wind_dir,
        directionDegree: wind_degree,
      },
      humidity,
      visibility: vis_miles,
      airPressure: pressure_mb,
    }),
  );

export const WeatherResponseSchema = z
  .object({
    location: LocationSchema,
    current: CurrentSchema,
  })
  .transform(({ location, current }) => ({ location, weather: current }));
export type Weather = z.infer<typeof WeatherResponseSchema>;
