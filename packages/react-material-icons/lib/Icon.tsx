import type { MaterialIcon as IconName } from "@material-design-icons/font";
import { clsx } from "clsx";
import "./Icon.scss";

type IconProps = {
  style?: "outlined" | "round" | "sharp" | "two-tone";
  size?: "small" | "medium" | "large";
  name: IconName;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  className?: string;
  disabled?: boolean;
};

export const Icon = ({
  style,
  size = "medium",
  name,
  color,
  className,
  disabled,
}: IconProps) => {
  const iconClass = clsx(
    style === undefined ? "material-icons" : `material-icons-${style}`,
    {
      [`material-icons--${size}`]: size,
      [`material-icons--${color}`]: color,
      ["material-icons--disabled"]: disabled,
    },
    className,
  );

  return <span className={iconClass}>{name}</span>;
};
