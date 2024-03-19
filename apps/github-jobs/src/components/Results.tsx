import ReactPaginate from "react-paginate";
import { type Job } from "../services/jobs";
import { JobCard } from "./JobCard";
import "./Results.scss";
import { Icon } from "@hdoc-react/material-icons";

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
