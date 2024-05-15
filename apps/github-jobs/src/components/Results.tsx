import { Pagination } from "../components/Pagination";
import type { Job } from "../types";
import { JobCard } from "./JobCard";
import "./Results.scss";

export const Results = ({ jobs }: { jobs: Job[] }) => {
  return (
    <>
      <div className="job-results">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {jobs.length === 10 && <Pagination />}
    </>
  );
};
