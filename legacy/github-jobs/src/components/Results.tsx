import { createJobLink } from "@/utils/jobs";
import { Link } from "react-router-dom";
import { JobCard } from "./JobCard";
import type { Job } from "@/types";
import "./Results.scss";

export const Results = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="job-results">
      {jobs.map((job) => (
        <Link
          key={job.id}
          to={`/job/${createJobLink(job)}`}
          state={{ job }}
          className="job-results__link"
        >
          <JobCard job={job}>
            <JobCard.Image />
            <JobCard.Company />
            <JobCard.Title />
            <JobCard.ScheduleType />
            <JobCard.Location />
            <JobCard.CreatedAt />
          </JobCard>
        </Link>
      ))}
    </div>
  );
};
