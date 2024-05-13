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
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setQuery = useJobsStore((s) => s.setSearchQuery);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    try {
      const [locationError, location] = await getLocationOption(
        options.location,
      );

      if (locationError) throw locationError;

      const [error, jobs] = await getJobs(search, { ...options, location });

      if (error) throw error;

      setJobs(jobs);
      setStatus("success");
    } catch (error) {
      // NOTE: All errors are thrown and handled manually
      setError(error as Error);
      setStatus("error");
    }
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
