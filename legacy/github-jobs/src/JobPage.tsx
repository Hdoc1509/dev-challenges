import { useLocation, Link } from "react-router-dom";
import { Icon } from "@hrc/material-icons";
import { JobCard } from "@/components/JobCard";
import type { Job } from "@/types";
import './JobPage.scss';

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
          <p>
            Please contact the company via its{" "}
            <a
              className="company-website"
              href={job.company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              website.
            </a>
          </p>
        </section>
      </aside>
      <JobCard job={job} isInJobPage />
    </main>
  );
};
