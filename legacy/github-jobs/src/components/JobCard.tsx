import clsx from "clsx";
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
  const className = clsx("job-card", { "job-card--in-job-page": isInJobPage });

  return (
    <div className={className}>
      <div className="job-card__image">
        {thumbnail ? (
          <img src={thumbnail} alt={`${company.name} logo`} />
        ) : (
          <p className="job-card__no-image">not found</p>
        )}
      </div>
      <p className="job-card__company">{company.name}</p>
      <p className="job-card__title">{title}</p>
      {isFullTime && <p className="job-card__schedule-type">Full time</p>}
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
