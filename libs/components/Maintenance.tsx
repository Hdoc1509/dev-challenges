import { Icon } from "@hrc/material-icons";
import "./Maintenance.scss";

const ISSUE_BASE_URL = "https://github.com/Hdoc1509/dev-challenges/issues";

type Props = {
  issue: number;
  repairImageSrc: string;
};

export function Maintenance({ issue, repairImageSrc }: Props) {
  return (
    <main className="maintenance">
      <h2 className="maintenance__title">Website under maintenance</h2>
      <h3 className="maintenance__subtitle">I hope to be back soon!</h3>
      <img
        src={repairImageSrc}
        className="maintenance__image"
        alt="repair image"
      />
      <p className="maintenance__description">
        If you are curious, you can check{" "}
        <a
          className="maintenance__issue-link"
          href={`${ISSUE_BASE_URL}/${issue}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          this issue <Icon name="open_in_new" />
        </a>{" "}
        for more information.
      </p>
    </main>
  );
}
