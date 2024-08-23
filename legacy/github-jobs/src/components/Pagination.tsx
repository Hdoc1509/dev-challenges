import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
import { useSearchStore, type StoreSearch } from "@/store/search";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { JobsEmptyResultsError } from "@/errors";
import { getLocationOption } from "@/utils/geolocation";
import { isSameSearch } from "@/utils/search";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { Ellipsis } from "./Icons";
import { isDev } from "@/config";
import "./Pagination.scss";

export const Pagination = () => {
  const cachedJobs = useJobsStore((s) => s.cachedJobs);
  const search = useSearchStore((s) => s.search);
  const lastSearch = useSearchStore((s) => s.lastSearch);
  const pages = useSearchStore((s) => s.pages);
  const setJobs = useJobsStore((s) => s.setJobs);
  const cacheJobs = useJobsStore((s) => s.cacheJobs);
  const setError = useJobsStore((s) => s.setError);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setPages = useSearchStore((s) => s.setPages);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      const { query, fullTime } = search;
      const newPageCache = cachedJobs[newPage];

      if (newPageCache != null) {
        setJobs(newPageCache);
        setSearch({ pageAsIndex: newPage });
        return;
      }

      setStatus("loading");

      const newLocation =
        search.location === "" ? lastSearch.location : search.location;
      const [locationError, location] = await getLocationOption(newLocation);

      if (locationError) return setError(locationError);

      const { nextPageToken } = search;

      const newSearch: StoreSearch = {
        query: query === "" ? "front" : query,
        location,
        pageAsIndex: newPage,
        fullTime,
        nextPageToken,
      };

      const [jobsError, jobsResult] = await (isDev
        ? getMockedJobs(newSearch)
        : getJobs(newSearch));

      if (jobsError) {
        if (jobsError instanceof JobsEmptyResultsError) {
          setJobs([]);
          setPages(newPage + 1);
        }

        return setError(jobsError);
      }

      const { jobs, nextPageToken: newNextPageToken } = jobsResult;

      setJobs(jobs);
      cacheJobs(jobs);
      setSearch({ pageAsIndex: newPage, nextPageToken: newNextPageToken });
      setLastSearch({ ...search, location });
      setPages(newNextPageToken == null ? newPage + 1 : 10);
    },
    [
      search,
      cachedJobs,
      setStatus,
      lastSearch.location,
      setError,
      setJobs,
      cacheJobs,
      setSearch,
      setLastSearch,
      setPages,
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
