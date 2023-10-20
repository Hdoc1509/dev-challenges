import { clsx } from "clsx";
import type { Filter } from "../utils";
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
        className={navClassName("all")}
        onClick={() => setPath("all")}
        href="#"
      >
        All
      </a>
      <a
        className={navClassName("active")}
        onClick={() => setPath("active")}
        href="#"
      >
        Active
      </a>
      <a
        className={navClassName("completed")}
        onClick={() => setPath("completed")}
        href="#"
      >
        Completed
      </a>
    </nav>
  );
};
