import { type Job } from "../services/jobs";
import "./Results.scss";

type Props = {
  jobs: Job[];
};

export const Results = ({ jobs }: Props) => {
  return (
    <main>
      {jobs.map((job, idx) => (
        <p key={job.id}>
          {idx + 1} - {job.isFullTime ? "Full Time" : "Part Time"}
        </p>
      ))}
    </main>
  );
};
