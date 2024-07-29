import { useJobsStore } from "@/store/jobs";
import { createJobLink } from "@/utils/jobs";
import { Link } from "react-router-dom";
import { JobCard } from "./JobCard";
import type { Job } from "@/types";
import "./Results.scss";

export const Results = ({ jobs }: { jobs: Job[] }) => {
  const search = useJobsStore((s) => s.search);

  if (jobs.length === 0) {
    return <p className="error">No jobs found for: {search.query}</p>;
  }

  return (
    <div className="job-results">
      {jobs.map((job) => (
        <Link
          key={job.id}
          to={`/job/${createJobLink(job)}`}
          state={{ job }}
          className="job-results__link"
        >
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
};
