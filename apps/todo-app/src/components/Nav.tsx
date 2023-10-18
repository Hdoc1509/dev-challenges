import { useState } from "react";
import { clsx } from "clsx";
import "./Nav.scss";

type NavPath = "all" | "active" | "completed";

export const Nav = () => {
  const [navPath, setNavPath] = useState<NavPath>("all");

  const navClassName = (path: NavPath) =>
    clsx("main-nav__link", {
      "main-nav__link--selected": path === navPath,
    });

  return (
    <nav className="main-nav">
      <a
        className={navClassName("all")}
        onClick={() => setNavPath("all")}
        href="#"
      >
        All
      </a>
      <a
        className={navClassName("active")}
        onClick={() => setNavPath("active")}
        href="#"
      >
        Active
      </a>
      <a
        className={navClassName("completed")}
        onClick={() => setNavPath("completed")}
        href="#"
      >
        Completed
      </a>
    </nav>
  );
};
