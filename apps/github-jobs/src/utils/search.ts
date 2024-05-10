import { FormFieldsSchema } from "../schemas/form";
import type { SearchOptions } from "../types";

type FormSearch = [string, SearchOptions];

export const getFormSearch = (form: HTMLFormElement): FormSearch => {
  const fields = Object.fromEntries(new FormData(form));
  const parsedFields = FormFieldsSchema.parse(fields);
  const { search, fullTime, location, city } = parsedFields;

  if (location === "" && city == null) {
    return [search, { fullTime }];
  }

  // console.log({ search, fullTime, location, city });

  // NOTE: location has a higher priority than pre-defined city option
  if (location === "" && city != null) {
    return [search, { fullTime, location: city }];
  }

  return [search, { fullTime, location }];
};
