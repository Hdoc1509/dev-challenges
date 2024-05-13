import { useJobsStore } from "../store/jobs";
import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner";
import { JobCard } from "./JobCard";
import "./Results.scss";

export const Results = () => {
  const jobs = useJobsStore((s) => s.jobs);
  const isLoading = useJobsStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <main>
        <RingSpinner size="large" />
      </main>
    );
  }

  return (
    <main>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <nav aria-label="Search results pages">
        {/* TODO: Add pagination logic */}
        <ReactPaginate
          className="jobs-pagination"
          breakLabel="..."
          nextLabel={<Icon name="keyboard_arrow_right" />}
          previousLabel={<Icon name="keyboard_arrow_left" />}
          pageCount={10}
          marginPagesDisplayed={1}
        />
      </nav>
    </main>
  );
};
