import { useJobsStore } from "../store/jobs";
import { RingSpinner } from "@hrc/spinner";
import { JobCard } from "./JobCard";
import "./Results.scss";

export const Results = () => {
  const search = useJobsStore((s) => s.searchQuery);
  const jobs = useJobsStore((s) => s.jobs);
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);

  if (status === "loading") {
    return <RingSpinner size="large" />;
  }

  if (status === "error") {
    return <h3>{error?.message}</h3>;
  }

  if (jobs.length === 0) {
    return <h3>No jobs found for: {search}</h3>;
  }

  return (
    <div className="job-results">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
