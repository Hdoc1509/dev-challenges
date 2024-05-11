import { useLocation } from "react-router-dom";
import type { Job } from "../types";

export const JobPage = () => {
  const location = useLocation();

  const { job } = location.state as { job: Job };
  const { title, isFullTime } = job;

  return (
    <>
      <h2>{title}</h2>
      {isFullTime && <p>Full time</p>}
    </>
  );
};
