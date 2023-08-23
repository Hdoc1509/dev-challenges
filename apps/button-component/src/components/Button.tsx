import classNames from "classnames";
import "./Button.scss";
import { ComponentProps } from "react";
import { Icon } from "@hdoc/react-material-icons";

// Taken from https://stackoverflow.com/a/76212204
type Prettify<T> = T extends infer R
  ? {
      [K in keyof R]: R[K];
    }
  : never;

type IconProps = ComponentProps<typeof Icon>;

type Props = Prettify<{
  variant?: "outline" | "text";
  disableShadow?: boolean;
  disabled?: boolean;
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  iconStyle?: IconProps['variant'];
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary" | "danger";
} & Omit<ComponentProps<"button">, 'className'>>;

export const Button = ({
  variant,
  disableShadow = false,
  startIcon,
  endIcon,
  iconStyle,
  size = "md",
  color,
  ...restProps
}: Props) => {
  const btnClass = classNames("btn", {
    [`btn--${variant}`]: variant !== undefined,
    ["btn--no-shadow"]: disableShadow,
    [`btn--${size}`]: size !== undefined,
    [`btn--${color}`]: color !== undefined && color !== "default",
  });

  return (
    <button {...restProps} className={btnClass}>
      {startIcon && <Icon name={startIcon} variant={iconStyle} size="small" />}
      Default
      {endIcon && <Icon name={endIcon} variant={iconStyle} size="small" />}
    </button>
  );
};
