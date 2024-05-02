import { Icon } from "@hrc/material-icons";
import type { Job } from "../services/jobs";
import "./JobCard.scss";

export const JobCard = ({ job }: { job: Job }) => {
  const { thumbnail, company, title, isFullTime, location, createdAt } = job;

  return (
    <div className="job-card">
      <div className="job-card__image">
        {thumbnail ? (
          <img src={thumbnail} alt={`${company} logo`} />
        ) : (
          <p className="job-card__no-image">not found</p>
        )}
      </div>
      <p className="job-card__company">{company}</p>
      <p className="job-card__title">{title}</p>
      {isFullTime && <p className="job-card__schedule-type">Full time</p>}
      <p className="job-card__location">
        <Icon name="public" /> {location}
      </p>
      <p className="job-card__created">
        <Icon name="access_time" /> {createdAt ?? "Unkown date"}
      </p>
    </div>
  );
};
