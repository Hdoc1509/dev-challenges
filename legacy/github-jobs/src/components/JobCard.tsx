import { Icon } from "@hrc/material-icons";
import type { Job } from "@/types";
import "./JobCard.scss";

type Props = {
  job: Job;
  isInJobPage?: boolean;
};

export const JobCard = ({ job, isInJobPage }: Props) => {
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
    <div className="job-card">
      <div className="job-card__image">
        {thumbnail ? (
          <img src={thumbnail} alt={`${company} logo`} />
        ) : (
          <p className="job-card__no-image">not found</p>
        )}
      </div>
      <p className="job-card__company">{company}</p>
      <p className="job-card__title">
        {title}
        {isInJobPage && isFullTime && (
          <span className="job-card__schedule-type">Full time</span>
        )}
      </p>
      {!isInJobPage && isFullTime && (
        <p className="job-card__schedule-type">Full time</p>
      )}
      <p className="job-card__location">
        <Icon name="public" /> {location}
      </p>
      <p className="job-card__created">
        <Icon name="access_time" /> {createdAt ?? "Unkown date"}
      </p>
      {isInJobPage && <p className="job-card__description">{description}</p>}
    </div>
  );
};
