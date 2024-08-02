import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { useJobsStore } from "@/store/jobs";
import { getLocationOption } from "@/utils/geolocation";
import { isSameSearch } from "@/utils/search";
import { Button } from "@hrc/button/dist/Button";
import { Input } from "@hrc/input/dist/Input";
import { Icon } from "@hrc/material-icons";
import { isDev } from "@/config";
import "./SearchForm.scss";

export const SearchForm = () => {
  const search = useJobsStore((s) => s.search);
  const lastSearch = useJobsStore((s) => s.lastSearch);
  const status = useJobsStore((s) => s.status);
  const setSearch = useJobsStore((s) => s.setSearch);
  const setLastSearch = useJobsStore((s) => s.setLastSearch);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDev && isSameSearch(search, lastSearch)) return;

    const { location: newLocation } = search;

    setStatus("loading");

    const [locationError, location] = await getLocationOption(newLocation);

    if (locationError) return setError(locationError);

    const newSearch = { ...search, location };
    const [jobsError, jobs] = await (isDev
      ? getMockedJobs(newSearch)
      : getJobs(newSearch));

    if (jobsError) return setError(jobsError);

    setJobs(jobs);
    setLastSearch(search);
    setPages(jobs.length < 10 ? 1 : 10);
  };

  return (
    <section className="search-form">
      <form
        id="search-form"
        className="search-form__inner"
        onSubmit={(e) => void handleSubmit(e)}
        data-loading={status === "loading"}
      >
        <Input
          iconStart={<Icon name="work_outline" />}
          placeholder="Title, companies, expertise or benefits"
          onChange={(e) => setSearch({ query: e.target.value })}
          value={search.query}
          required
          fullWidth
        />
        <Button color="primary">Search</Button>
      </form>
    </section>
  );
};
