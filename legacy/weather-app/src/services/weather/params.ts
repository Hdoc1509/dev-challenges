import type { ParamOptions } from "@lib/fetcher";

export type WeatherParams = {
  client: ParamOptions<"latitude" | "longitude">;
  server: ParamOptions<"q" | "key">;
};
