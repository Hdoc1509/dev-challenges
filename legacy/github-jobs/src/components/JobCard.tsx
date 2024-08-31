import { createContext, useContext } from "react";
import { Icon } from "@hrc/material-icons";
import type { Job } from "@/types";
import "./JobCard.scss";

type Context = { job: Job };

const JobCardContext = createContext<Context | null>(null);

function useJobCardContext() {
  const context = useContext(JobCardContext);

  if (context == null)
    throw new Error("useJobCardContext must be used within a JobCard");

  return context;
}

type Props = React.PropsWithChildren<{ job: Job }>;

export function JobCard({ job, children }: Props) {
  return (
    <JobCardContext.Provider value={{ job }}>
      <div className="job-card">{children}</div>
    </JobCardContext.Provider>
  );
}

JobCard.Image = function JobCardImage() {
  const { job } = useJobCardContext();

  return (
    <div className="job-card__image">
      {job.thumbnail ? (
        <img src={job.thumbnail} alt={`${job.company} logo`} />
      ) : (
        <p className="job-card__no-image">not found</p>
      )}
    </div>
  );
};

JobCard.Company = function JobCardCompany() {
  const { job } = useJobCardContext();

  return <p className="job-card__company">{job.company}</p>;
};

JobCard.Title = function JobCardTitle({ children }: React.PropsWithChildren) {
  const { job } = useJobCardContext();

  return (
    <p className="job-card__title">
      {job.title}
      {children}
    </p>
  );
};

JobCard.ScheduleType = function JobCardScheduleType() {
  const { job } = useJobCardContext();

  if (!job.isFullTime) return null;

  return <p className="job-card__schedule-type">Full time</p>;
};

JobCard.Location = function JobCardLocation() {
  const { job } = useJobCardContext();

  return <p className="job-card__location">{job.location}</p>;
};

JobCard.CreatedAt = function JobCardCreated() {
  const { job } = useJobCardContext();

  return (
    <p className="job-card__created">
      <Icon name="access_time" /> {job.createdAt ?? "Unkown date"}
    </p>
  );
};

JobCard.Description = function JobCardDescription() {
  const { job } = useJobCardContext();

  return <p className="job-card__description">{job.description}</p>;
};
