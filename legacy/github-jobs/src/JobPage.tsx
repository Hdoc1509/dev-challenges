import { useLocation, Link } from "react-router-dom";
import { Icon } from "@hrc/material-icons";
import { JobCard } from "@/components/JobCard";
import type { Job, ApplyOption as ApplyOptionType } from "@/types";
import "./JobPage.scss";

const ApplyOption = ({ option }: { option: ApplyOptionType }) => (
  <a
    className="job-page__apply-option"
    href={option.link}
    target="_blank"
    rel="noopener noreferrer"
  >
    Apply on {option.title}
    <Icon name="open_in_new" />
  </a>
);

export const JobPage = () => {
  const location = useLocation();

  const { job } = location.state as { job: Job };

  return (
    <main className="job-page">
      <aside className="job-page__aside">
        <nav>
          <Link to="/" className="back-to-search">
            <Icon name="keyboard_backspace" /> Back to search
          </Link>
        </nav>
        <section className="job-page__apply">
          <h3>How to apply</h3>
          {job.applyOptions.map((option) => (
            <ApplyOption key={option.title} option={option} />
          ))}
        </section>
      </aside>
      <JobCard job={job} isInJobPage />
    </main>
  );
};
