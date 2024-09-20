import { useSearchStore } from "@/store/search";
import { useJobsStore } from "@/store/jobs";
import { useRemainingSearchesStore } from "@/store/remaining-searches";
import { isJobsEmptyResultsError } from "@/services/jobs/service-error";
import { isSameSearch } from "@/utils/search";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { SEARCH_FORM_ID } from "@/constants";
import { STATUS } from "@lib/fetcher";
import { isDev } from "@/config";
import "./SearchForm.scss";

export const SearchForm = () => {
  const status = useJobsStore((s) => s.status);
  const searchJobs = useJobsStore((s) => s.searchJobs);
  const getRemainingSearches = useRemainingSearchesStore(
    (s) => s.getRemainingSearches,
  );
  const search = useSearchStore((s) => s.search);
  const lastSearch = useSearchStore((s) => s.lastSearch);
  const userLocation = useSearchStore((s) => s.userLocation);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setPages = useSearchStore((s) => s.setPages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDev && isSameSearch({ current: search, last: lastSearch })) return;

    const location = search.location === "" ? userLocation : search.location;
    const newSearch = { ...search, pageAsIndex: 0, location, clearCache: true };

    setPages(0);

    const [searchError, searchResult] = await searchJobs(newSearch);

    if (searchError) {
      if (isJobsEmptyResultsError(searchError)) getRemainingSearches();
      setPages(0);
      return;
    }

    const { nextPageToken, usedLocation } = searchResult;

    setSearch({ pageAsIndex: 0, nextPageToken });
    setLastSearch({ ...search, location: usedLocation });
    setPages(nextPageToken == null ? 1 : 10);
    getRemainingSearches();
  };

  return (
    <section className="search-form">
      <form
        id={SEARCH_FORM_ID}
        className="search-form__inner"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <Input
          iconStart={<Icon name="work_outline" />}
          placeholder="Title, companies, expertise or benefits"
          onChange={(e) => setSearch({ query: e.target.value })}
          value={search.query}
          required
          fullWidth
        />
        <Button color="primary" disabled={status === STATUS.LOADING}>
          Search
        </Button>
      </form>
    </section>
  );
};
