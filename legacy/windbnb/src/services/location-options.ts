import staysMock from "@/mocks/stays.json";
import { splitStringLocation, stringifyLocation } from "@/utils";
import type { PromiseWithError } from "@lib/fetcher";
import type { RequiredSearchLocation } from "@/types";

type LocationOption = RequiredSearchLocation;

const uniqueLocations = new Set(staysMock.map(stringifyLocation));
const locations = Array.from(uniqueLocations).map(splitStringLocation);

export async function getLocationOptions(): PromiseWithError<LocationOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [null, locations];
}
