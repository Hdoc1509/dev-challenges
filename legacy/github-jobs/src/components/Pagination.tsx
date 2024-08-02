import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
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
  const search = useJobsStore((s) => s.search);
  const lastSearch = useJobsStore((s) => s.lastSearch);
  const pages = useJobsStore((s) => s.pages);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setError = useJobsStore((s) => s.setError);
  const setLastSearch = useJobsStore((s) => s.setLastSearch);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setPages = useJobsStore((s) => s.setPages);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      const { query, location: newLocation, fullTime } = search;

      setStatus("loading");

      const [locationError, location] = await getLocationOption(newLocation);

      if (locationError) return setError(locationError);

      const newSearch = {
        query: query === "" ? "front" : query,
        location,
        page: newPage + 1,
        fullTime,
      };

      const [jobsError, jobs] = await (isDev
        ? getMockedJobs(newSearch)
        : getJobs(newSearch));

      if (jobsError) {
        if (jobsError instanceof JobsEmptyResultsError) {
          setJobs([]);
          setPages(newSearch.page);
        }

        return setError(jobsError);
      }

      setJobs(jobs);
      setLastSearch(search);
      if (jobs.length < 10) setPages(newSearch.page);
    },
    [search, setError, setJobs, setLastSearch, setPages, setStatus],
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
        forcePage={search.page ?? 0}
        marginPagesDisplayed={0}
        onPageChange={({ selected }) => void handlePageChange(selected)}
        onClick={({ selected, isBreak }) => {
          if (!isSameSearch(search, lastSearch)) return false;

          // go to next page if is break label
          if (isBreak) return selected + 1;
        }}
      />
    </nav>
  );
};
