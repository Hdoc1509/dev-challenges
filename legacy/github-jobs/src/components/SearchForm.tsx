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
  const cacheJobs = useJobsStore((s) => s.cacheJobs);
  const clearCachedJobs = useJobsStore((s) => s.clearCachedJobs);
  const setSearch = useJobsStore((s) => s.setSearch);
  const setLastSearch = useJobsStore((s) => s.setLastSearch);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);
  const setPages = useJobsStore((s) => s.setPages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDev && isSameSearch({ current: search, last: lastSearch })) return;

    setStatus("loading");

    const newLocation =
      search.location === "" ? lastSearch.location : search.location;
    const [locationError, location] = await getLocationOption(newLocation);

    if (locationError) return setError(locationError);

    const newSearch = { ...search, pageAsIndex: 0, location };
    const [jobsError, jobsResult] = await (isDev
      ? getMockedJobs(newSearch)
      : getJobs(newSearch));

    if (jobsError) return setError(jobsError);

    const { jobs, nextPageToken } = jobsResult;

    setJobs(jobs);
    setSearch({ pageAsIndex: 0, nextPageToken });
    setLastSearch({ ...search, location });
    clearCachedJobs();
    if (nextPageToken == null) setPages(1);
    else {
      setPages(10);
      cacheJobs(jobs);
    }
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
