import { z } from "zod";
import { predefinedCities } from "../constants";

export const FormFieldsSchema = z
  .object({
    "full-time": z.literal("on").optional(),
    city: z.enum(predefinedCities).optional(),
    location: z.string(),
    search: z.string(),
  })
  .transform(({ city, location, search, ...rest }) => ({
    city,
    fullTime: rest["full-time"],
    location,
    search,
  }));

export type FormFields = z.infer<typeof FormFieldsSchema>;
