import { useSearchStore } from "@/store/search";
import { useJobs } from "@/hooks/useJobs";
import { isSameSearch } from "@/utils/search";
import { Button } from "@hrc/button";
import { Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { isDev } from "@/config";
import "./SearchForm.scss";

export const SearchForm = () => {
  const { jobsStatus, searchJobs } = useJobs();
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

    const [searchError, searchResult] = await searchJobs(newSearch);

    if (searchError) return setPages(0);

    const { nextPageToken, usedLocation } = searchResult;

    setSearch({ pageAsIndex: 0, nextPageToken });
    setLastSearch({ ...search, location: usedLocation });
    if (nextPageToken == null) setPages(1);
    else setPages(10);
  };

  return (
    <section className="search-form">
      <form
        id="search-form"
        className="search-form__inner"
        onSubmit={(e) => void handleSubmit(e)}
        data-loading={jobsStatus === "loading"}
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
