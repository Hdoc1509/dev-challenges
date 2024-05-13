// import { getJobs } from "../services/jobs";
import { getJobs } from "../services/jobs-mock";
import { useJobsStore } from "../store/jobs";
import { getLocationOption } from "../utils/jobs";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import "./SearchForm.scss";

export const SearchForm = () => {
  const search = useJobsStore((s) => s.searchQuery);
  const options = useJobsStore((s) => s.searchOptions);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setLoading = useJobsStore((s) => s.setLoading);
  const setQuery = useJobsStore((s) => s.setSearchQuery);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setJobs([]);

    const [locationError, location] = await getLocationOption(options.location);

    if (locationError) {
      console.error(locationError);
      return;
    }

    options.location = location;

    const [error, jobs] = await getJobs(search, { ...options });

    if (error) {
      console.error(error);
      return;
    }

    setJobs(jobs);
    setLoading(false);
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
          onChange={(e) => setQuery(e.target.value)}
          value={search}
          required
          fullWidth
        />
        <Button color="primary">Search</Button>
      </form>
    </section>
  );
};
