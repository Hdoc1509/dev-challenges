import type { Job } from "../services/jobs";
import "./JobCard.scss";

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="job-card debug">
      <div className="job-card__image">
        {job.thumbnail ? (
          <img src={job.thumbnail} alt={`${job.company} logo`} />
        ) : (
          <p className="job-card__no-image">not found</p>
        )}
      </div>
      <h5 className="job-card__company">{job.company}</h5>
      <h4 className="job-card__title">{job.title}</h4>
      {job.isFullTime && <p className="job-card__schedule-type">Full time</p>}
      <p className="job-card__location">{job.location}</p>
      <p className="job-card__created">{job.createdAt ?? "Unkown date"}</p>
    </div>
  );
};
