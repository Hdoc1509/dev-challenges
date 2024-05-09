import { FormFieldsSchema } from "../schemas/form";

type SearchOptions = {
  fullTime?: "on";
  location?: string;
  zipCode?: number;
};

type FormSearch = [string, SearchOptions];

export const getFormSearch = (form: HTMLFormElement): FormSearch => {
  const fields = Object.fromEntries(new FormData(form));
  const parsedFields = FormFieldsSchema.parse(fields);
  const { search, fullTime, location, city } = parsedFields;

  if (location === "" && city == null) {
    return [search, { fullTime }];
  }

  const parsedLocation = parseInt(location);

  console.log({ search, fullTime, location, city });

  if (isNaN(parsedLocation)) {
    // NOTE: location has a higher priority than pre-defined city option
    if (location === "" && city != null) {
      return [search, { fullTime, location: city }];
    }

    return [search, { fullTime, location }];
  }

  // INFO: about zipcode
  // - https://en.wikipedia.org/wiki/ZIP_Code
  // - https://tools.usps.com/zip-code-lookup.htm
  return [search, { fullTime, zipCode: parsedLocation }];
};
