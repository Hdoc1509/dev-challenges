import { Icon } from "@hrc/material-icons";
import type { Job } from "../types";
import "./JobDetails.scss";

export const JobDetails = ({ job }: { job: Job }) => {
  const {
    thumbnail,
    company,
    title,
    isFullTime,
    location,
    createdAt,
    description,
  } = job;

  return (
    <main className="job-details">
      <header className="job-details__header">
        <h2 className="job-details__title">{title}</h2>
        {isFullTime && <p className="job-details__schedule-type">Full time</p>}
        <p className="job-details__created">
          <Icon name="access_time" /> {createdAt ?? "Unkown date"}
        </p>
      </header>
      <div className="job-details__company-info">
        <div className="job-details__image">
          {thumbnail ? (
            <img src={thumbnail} alt={`${company.name} logo`} />
          ) : (
            <p className="job-details__no-image">not found</p>
          )}
        </div>
        <p className="job-details__company">{company.name}</p>
        <p className="job-details__location">
          <Icon name="public" /> {location}
        </p>
      </div>
      <p className="job-details__description">{description}</p>
    </main>
  );
};
