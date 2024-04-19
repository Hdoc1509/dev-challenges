import clsx from "clsx";
import type { Simplify } from "type-fest";
import "./Drawer.scss";

const CloseIcon = () => {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
};

type Props = Simplify<
  {
    open?: boolean;
    onClose?: () => void;
    header?: string;
  } & React.ComponentProps<"div">
>;

export const Drawer = ({
  children,
  className,
  header,
  onClose,
  open,
}: Props) => {
  const drawerClass = clsx(
    "drawer",
    {
      "drawer--open": open,
    },
    className,
  );

  return (
    <div className={drawerClass}>
      <div
        className="drawer__backdrop"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="drawer__content">
        <header className="drawer__header" data-drawer-header={header}>
          {header}
          <button className="drawer__close" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};
