import type { ComponentProps } from "react";
import { Icon } from "@hdoc/react-material-icons";

type IconProps = ComponentProps<typeof Icon>;

export type InputProps = {
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  startIcon?: IconProps["name"];
  endIcon?: IconProps["name"];
  value?: string;
  size?: "sm" | "md";
};
