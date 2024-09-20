import { useCallback } from "react";
import { useSearchStore, type StoreSearch } from "@/store/search";
import { useJobs } from "@/hooks/useJobs";
import { useRemainingSearchesStore } from "@/store/remaining-searches";
import clsx from "clsx";
import { isJobsEmptyResultsError } from "@/services/jobs/service-error";
import { isSameSearch } from "@/utils/search";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { Ellipsis } from "./Icons";
import "./Pagination.scss";

export const Pagination = () => {
  const { isLoading, searchJobs } = useJobs();
  const getRemainingSearches = useRemainingSearchesStore(
    (s) => s.getRemainingSearches,
  );
  const search = useSearchStore((s) => s.search);
  const lastSearch = useSearchStore((s) => s.lastSearch);
  const userLocation = useSearchStore((s) => s.userLocation);
  const pages = useSearchStore((s) => s.pages);
  const setSearch = useSearchStore((s) => s.setSearch);
  const setLastSearch = useSearchStore((s) => s.setLastSearch);
  const setPages = useSearchStore((s) => s.setPages);

  const className = clsx("jobs-pagination", { disabled: isLoading });

  const handlePageChange = useCallback(
    async (newPage: number) => {
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
        if (isJobsEmptyResultsError(searchError)) {
          setPages(newPage + 1);
          getRemainingSearches();
        }

        return;
      }

      const {
        nextPageToken: newNextPageToken,
        usedLocation,
        isCached,
      } = searchResult;

      if (isCached) return setSearch({ pageAsIndex: newPage });

      setSearch({ pageAsIndex: newPage, nextPageToken: newNextPageToken });
      setLastSearch({ ...search, location: usedLocation });
      setPages(newNextPageToken == null ? newPage + 1 : 10);
      getRemainingSearches();
    },
    [
      search,
      userLocation,
      searchJobs,
      setSearch,
      setLastSearch,
      setPages,
      getRemainingSearches,
    ],
  );

  return (
    <nav aria-label="Search results pages">
      <ReactPaginate
        className={className}
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
          if (!isSameSearch({ current: search, last: lastSearch }) || isLoading)
            return false;

          // go to next page if is break label
          if (isBreak) return selected + 1;
        }}
      />
    </nav>
  );
};
