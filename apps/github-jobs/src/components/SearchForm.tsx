// import { getJobs } from "../services/jobs";
import { getJobs } from "../services/jobs-mock";
import { searchLocation } from "../services/geolocation";
import { useJobsStore } from "../store/jobs";
import { getFormSearch } from "../utils/search";
import { getCurrentCoords } from "../utils/geolocation";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import "./SearchForm.scss";

export const SearchForm = () => {
  const setJobs = useJobsStore((s) => s.setJobs);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [search, options] = getFormSearch(e.currentTarget);

    if (options.location === "" || options.location == null) {
      const [cordsError, coords] = await getCurrentCoords();

      if (cordsError) {
        console.error(cordsError);
        return;
      }

      const [locationError, coordsLocation] = await searchLocation({ coords });

      if (locationError) {
        console.error(locationError);
        return;
      }

      options.location = coordsLocation.name;
    }

    const parsedLocation = parseInt(options.location);

    if (!isNaN(parsedLocation)) {
      // INFO: about zipcode
      // - https://en.wikipedia.org/wiki/ZIP_Code
      // - https://tools.usps.com/zip-code-lookup.htm
      const [locationError, zipLocation] = await searchLocation({
        zipCode: parsedLocation,
      });

      if (locationError) return locationError;

      options.location = zipLocation.name;
    }

    const [error, jobs] = await getJobs(search, { ...options });

    if (error) {
      console.error(error);
      return;
    }

    setJobs(jobs);
  };

  return (
    <section className="search-form">
      <form
        id="search-form"
        className="search-form__inner"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <Input
          iconStart={<Icon name="work_outline" />}
          placeholder="Title, companies, expertise or benefits"
          name="search"
          required
          fullWidth
        />
        <Button color="primary">Search</Button>
      </form>
    </section>
  );
};
