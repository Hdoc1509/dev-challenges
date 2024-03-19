import { Icon } from "@hdoc-react/material-icons";
import type { Job } from "../services/jobs";
import "./JobCard.scss";

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="job-card">
      <div className="job-card__image">
        {job.thumbnail ? (
          <img src={job.thumbnail} alt={`${job.company} logo`} />
        ) : (
          <p className="job-card__no-image">not found</p>
        )}
      </div>
      <p className="job-card__company">{job.company}</p>
      <p className="job-card__title">{job.title}</p>
      {job.isFullTime && (
        <p className="job-card__schedule-type">
          <span>Full time</span>
        </p>
      )}
      <p className="job-card__location">
        <Icon name="public" /> {job.location}
      </p>
      <p className="job-card__created">
        <Icon name="access_time" /> {job.createdAt ?? "Unkown date"}
      </p>
    </div>
  );
};
