import { useJobsStore } from "../store/jobs";
import { RingSpinner } from "@hrc/spinner";
import { JobCard } from "./JobCard";
import "./Results.scss";

export const Results = () => {
  const jobs = useJobsStore((s) => s.jobs);
  const status = useJobsStore((s) => s.status);
  const error = useJobsStore((s) => s.error);

  if (status === "loading") {
    return <RingSpinner size="large" />;
  }

  if (status === "error") {
    return <h3>{error?.message}</h3>;
  }

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};
