import { useLocation, Link } from "react-router-dom";
import { Icon } from "@hrc/material-icons";
import { JobDetails } from "../components/JobDetails";
import type { Job } from "../types";

export const JobPage = () => {
  const location = useLocation();

  const { job } = location.state as { job: Job };

  return (
    <div className="job-page">
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
      <JobDetails job={job} />
    </div>
  );
};
