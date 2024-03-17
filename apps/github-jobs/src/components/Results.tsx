import { type Job } from "../services/jobs";
import { JobCard } from "./JobCard";
import "./Results.scss";

type Props = {
  jobs: Job[];
};

export const Results = ({ jobs }: Props) => {
  return (
    <main>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </main>
  );
};
