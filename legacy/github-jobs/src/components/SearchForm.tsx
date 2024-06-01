import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { useJobsStore } from "@/store/jobs";
import { getLocationOption } from "@/utils/geolocation";
import { Button } from "@hrc/button/dist/Button";
import { Input } from "@hrc/input/dist/Input";
import { Icon } from "@hrc/material-icons";
import { isDev } from "@/config";
import "./SearchForm.scss";

export const SearchForm = () => {
  const search = useJobsStore((s) => s.search);
  const setSearch = useJobsStore((s) => s.setSearch);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    try {
      const [locationError, location] = await getLocationOption(
        search.location,
      );

      if (locationError) throw locationError;

      const newSearch = { ...search, location };
      const [error, jobs] = await (isDev
        ? getMockedJobs(newSearch)
        : getJobs(newSearch));

      if (error) throw error;

      setJobs(jobs);
      setStatus("success");
      setPages(jobs.length < 10 ? 1 : 10);
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
          onChange={(e) => setSearch({ query: e.target.value})}
          value={search.query}
          required
          fullWidth
        />
        <Button color="primary">Search</Button>
      </form>
    </section>
  );
};
