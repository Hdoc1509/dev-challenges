import ReactPaginate from "react-paginate";
import { Icon } from "@hrc/material-icons";
import { JobCard } from "./JobCard";
import { type Job } from "../services/jobs";
import "./Results.scss";

type Props = {
  jobs: Job[];
};

export const Results = ({ jobs }: Props) => {
  return (
    <main>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <ReactPaginate
        className="jobs-pagination"
        breakLabel="..."
        nextLabel={<Icon name="keyboard_arrow_right" />}
        previousLabel={<Icon name="keyboard_arrow_left" />}
        pageCount={10}
        marginPagesDisplayed={1}
      />
    </main>
  );
};
