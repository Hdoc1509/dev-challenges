import { useCallback } from "react";
import { useJobsStore } from "../store/jobs";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { JobCard } from "./JobCard";
import "./Results.scss";

export const Results = () => {
  const jobs = useJobsStore((s) => s.jobs);
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);

  const handlePageChange = useCallback((newPage: number) => {
    // TODO: Get jobs on page change
    console.log({ newPage });
  }, []);

  if (status === "loading") {
    return (
      <main>
        <RingSpinner size="large" />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main>
        <h3>{error?.message}</h3>
      </main>
    );
  }

  return (
    <main>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
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
    </main>
  );
};
