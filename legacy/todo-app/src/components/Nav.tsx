import { clsx } from "clsx";
import { FILTERS, type Filter } from "../utils";
import "./Nav.scss";

type Props = {
  setPath: (path: Filter) => void;
  path: Filter;
};

export const Nav = ({ path, setPath }: Props) => {
  const navClassName = (newPath: Filter) =>
    clsx("main-nav__link", {
      "main-nav__link--selected": newPath === path,
    });

  return (
    <nav className="main-nav">
      <a
        className={navClassName(FILTERS.ALL)}
        onClick={() => setPath(FILTERS.ALL)}
        href="#"
      >
        All
      </a>
      <a
        className={navClassName(FILTERS.ACTIVE)}
        onClick={() => setPath(FILTERS.ACTIVE)}
        href="#"
      >
        Active
      </a>
      <a
        className={navClassName(FILTERS.COMPLETED)}
        onClick={() => setPath(FILTERS.COMPLETED)}
        href="#"
      >
        Completed
      </a>
    </nav>
  );
};
