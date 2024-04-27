import type { ComponentProps } from "react";
import type { Simplify } from "@hrc/type-utils";
import type { Icon } from "@hrc/material-icons";

type IconProps = ComponentProps<typeof Icon>;
type InputMultiline = { multiline: true; rows?: number };
type InputNotMultiline = { multiline?: never; rows?: never };

export type InputProps = Simplify<
  {
    label?: string;
    labelClassName?: string;
    inputClassName?: string;
    error?: boolean;
    helperText?: string;
    startIcon?: IconProps["name"];
    endIcon?: IconProps["name"];
    size?: "sm" | "md";
    fullWidth?: boolean;
  } & (InputNotMultiline | InputMultiline) &
    Omit<ComponentProps<"input">, "size" | "className">
>;
