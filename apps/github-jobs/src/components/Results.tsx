import { type JobsResults } from "../services/jobs";
import "./Results.scss";

type Props = {
  jobs: JobsResults;
};

export const Results = ({ jobs }: Props) => {
  return (
    <main>
      {jobs.map((job, idx) => (
        <p key={job.job_id}>
          {idx + 1} - {job.extensions.toString()}
        </p>
      ))}
    </main>
  );
};
