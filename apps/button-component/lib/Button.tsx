import clsx from "clsx";
import { Icon, type IconProps } from "@hrc/material-icons";
import type { Simplify } from "@hrc/type-utils";
import "./css/styles.scss";

type Props = Simplify<
  {
    variant?: "outline" | "text";
    disableShadow?: boolean;
    disabled?: boolean;
    startIcon?: IconProps["name"];
    endIcon?: IconProps["name"];
    iconStyle?: IconProps["variant"];
    size?: "sm" | "md" | "lg";
    color?: "default" | "primary" | "secondary" | "danger";
  } & React.ComponentProps<"button">
>;

export const Button = ({
  variant,
  disableShadow,
  startIcon,
  endIcon,
  iconStyle,
  size = "md",
  color,
  className,
  ...restProps
}: Props) => {
  const btnClass = clsx(
    "btn",
    {
      [`btn--${variant}`]: variant,
      ["btn--no-shadow"]: disableShadow,
      [`btn--${size}`]: size,
      [`btn--${color}`]: color && color !== "default",
    },
    className,
  );

  return (
    <button {...restProps} className={btnClass}>
      {startIcon && <Icon name={startIcon} variant={iconStyle} size="small" />}
      Default
      {endIcon && <Icon name={endIcon} variant={iconStyle} size="small" />}
    </button>
  );
};
