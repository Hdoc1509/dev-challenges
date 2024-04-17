import clsx from "clsx";
import type { Simplify } from "type-fest";
import "./Drawer.scss";

type Props = Simplify<
  {
    open?: boolean;
    onClose?: () => void;
  } & React.ComponentProps<"div">
>;

export const Drawer = ({ className, children, open, onClose }: Props) => {
  const drawerClass = clsx(
    "drawer",
    {
      "drawer--open": open,
    },
    className,
  );

  return (
    <>
      <div className={drawerClass}>
        <div className="drawer__content">{children}</div>
        <div className="drawer__backdrop" onClick={onClose}></div>
      </div>
    </>
  );
};
