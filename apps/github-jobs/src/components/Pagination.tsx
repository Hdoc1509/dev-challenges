import { useCallback } from "react";
import { useJobsStore } from "../store/jobs";
import { getMockedJobs } from "../services/jobs-mock";
import { getLocationOption } from "../utils/jobs";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import "./Pagination.scss";

export const Pagination = () => {
  const search = useJobsStore((s) => s.searchQuery);
  const options = useJobsStore((s) => s.searchOptions);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setError = useJobsStore((s) => s.setError);
  const setStatus = useJobsStore((s) => s.setStatus);

  const handlePageChange = useCallback(
    async (newPage: number) => {
      setStatus("loading");

      try {
        const [locationError, location] = await getLocationOption(
          options.location,
        );

        if (locationError) throw locationError;

        const [jobsError, jobs] = await getMockedJobs(
          search === "" ? "front" : search,
          { ...options, location, page: newPage + 1 },
        );

        if (jobsError) throw jobsError;

        setJobs(jobs);
        setStatus("success");
      } catch (error) {
        // NOTE: All errors are thrown and handled manually
        setError(error as Error);
        setStatus("error");
      }
    },
    [options, search, setError, setJobs, setStatus],
  );

  return (
    <nav aria-label="Search results pages">
      <ReactPaginate
        className="jobs-pagination"
        breakLabel="..."
        nextLabel={<Icon name="keyboard_arrow_right" />}
        previousLabel={<Icon name="keyboard_arrow_left" />}
        pageCount={10}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => void handlePageChange(selected)}
      />
    </nav>
  );
};
