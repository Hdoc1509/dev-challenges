import type { ComponentProps } from "react";
import type { Simplify } from "type-fest";
import { Icon } from "@hdoc/react-material-icons";

type IconProps = ComponentProps<typeof Icon>;
type InputMultiline = { multiline: true; rows?: number };
type InputNotMultiline = { multiline?: never; rows?: never };

export type InputProps = Simplify<
  {
    label?: string;
    error?: boolean;
    helperText?: string;
    startIcon?: IconProps["name"];
    endIcon?: IconProps["name"];
    size?: "sm" | "md";
    fullWidth?: boolean;
  } & (InputNotMultiline | InputMultiline) &
    Omit<ComponentProps<"input">, "size">
>;
