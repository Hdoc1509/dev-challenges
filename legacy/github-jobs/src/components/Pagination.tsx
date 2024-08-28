import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
import { useJobs } from "@/hooks/useJobs";
import { useSearchStore, type StoreSearch } from "@/store/search";
import { JobsEmptyResultsError } from "@/errors";
import { isSameSearch } from "@/utils/search";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { Ellipsis } from "./Icons";
import "./Pagination.scss";

export const Pagination = () => {
  const { cachedJobs, searchJobs, setJobsError } = useJobs();
  const search = useSearchStore((s) => s.search);
  const lastSearch = useSearchStore((s) => s.lastSearch);
  const userLocation = useSearchStore((s) => s.userLocation);
  const pages = useSearchStore((s) => s.pages);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setPages = useSearchStore((s) => s.setPages);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      const newPageCache = cachedJobs[newPage];

      if (newPageCache != null) {
        setJobs(newPageCache);
        setSearch({ pageAsIndex: newPage });
        return;
      }

      const { query, fullTime, nextPageToken } = search;
      const location = search.location === "" ? userLocation : search.location;
      const newSearch: StoreSearch = {
        query: query === "" ? "front" : query,
        location,
        pageAsIndex: newPage,
        fullTime,
        nextPageToken,
      };

      const [searchError, searchResult] = await searchJobs(newSearch);

      if (searchError) {
        if (searchError instanceof JobsEmptyResultsError) {
          setJobs([]);
          setPages(newPage + 1);
        }

        return setJobsError(searchError);
      }

      const { nextPageToken: newNextPageToken, usedLocation } = searchResult;

      setSearch({ pageAsIndex: newPage, nextPageToken: newNextPageToken });
      setLastSearch({ ...search, location: usedLocation });
      setPages(newNextPageToken == null ? newPage + 1 : 10);
    },
    [
      search,
      cachedJobs,
      userLocation,
      searchJobs,
      setJobs,
      setSearch,
      setLastSearch,
      setPages,
      setJobsError,
    ],
  );

  return (
    <nav aria-label="Search results pages">
      <ReactPaginate
        className="jobs-pagination"
        // NOTE: pagination of SerpApi, only can navigate to prev/next page
        // so, is neceesary to use custom breakLabel?
        breakLabel={<Ellipsis />}
        nextLabel={<Icon name="keyboard_arrow_right" />}
        previousLabel={<Icon name="keyboard_arrow_left" />}
        pageCount={pages}
        forcePage={search.pageAsIndex ?? 0}
        marginPagesDisplayed={0}
        onPageChange={({ selected }) => void handlePageChange(selected)}
        onClick={({ selected, isBreak }) => {
          if (!isSameSearch({ current: search, last: lastSearch }))
            return false;

          // go to next page if is break label
          if (isBreak) return selected + 1;
        }}
      />
    </nav>
  );
};
