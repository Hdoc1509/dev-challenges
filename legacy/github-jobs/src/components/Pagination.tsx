import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { isDev } from "@/config";
import "./Pagination.scss";

export const Pagination = () => {
  const search = useJobsStore((s) => s.search);
  const pages = useJobsStore((s) => s.pages);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setError = useJobsStore((s) => s.setError);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setPages = useJobsStore((s) => s.setPages);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      setStatus("loading");

      const [locationError, location] = await getLocationOption(
        search.location,
      );

      if (locationError) return setError(locationError);

      const { query } = search;
      const newSearch = {
        query: query === "" ? "front" : query,
        location,
        page: newPage + 1,
      };

      const [jobsError, jobs] = await (isDev
        ? getMockedJobs(newSearch)
        : getJobs(newSearch));

      if (jobsError) return setError(jobsError);

      setJobs(jobs);
      if (jobs.length < 10) setPages(newPage + 1);
    },
    [search, setError, setJobs, setPages, setStatus],
  );

  return (
    <nav aria-label="Search results pages">
      <ReactPaginate
        className="jobs-pagination"
        breakLabel="..."
        nextLabel={<Icon name="keyboard_arrow_right" />}
        previousLabel={<Icon name="keyboard_arrow_left" />}
        pageCount={pages}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => void handlePageChange(selected)}
      />
    </nav>
  );
};
