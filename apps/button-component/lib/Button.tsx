import clsx from "clsx";
import { type ComponentProps } from "react";
import { Icon } from "@hrc/material-icons";
import type { Simplify } from "type-fest";
import "./css/styles.scss";

type IconProps = ComponentProps<typeof Icon>;

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
  } & Omit<ComponentProps<"button">, "className">
>;

export const Button = ({
  variant,
  disableShadow,
  startIcon,
  endIcon,
  iconStyle,
  size = "md",
  color,
  ...restProps
}: Props) => {
  const btnClass = clsx("btn", {
    [`btn--${variant}`]: variant,
    ["btn--no-shadow"]: disableShadow,
    [`btn--${size}`]: size,
    [`btn--${color}`]: color && color !== "default",
  });

  return (
    <button {...restProps} className={btnClass}>
      {startIcon && <Icon name={startIcon} variant={iconStyle} size="small" />}
      Default
      {endIcon && <Icon name={endIcon} variant={iconStyle} size="small" />}
    </button>
  );
};
