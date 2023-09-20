import clsx from "clsx";
import { Icon } from "@hdoc/react-material-icons";
import type { InputProps as Props } from "./types";
import type { ComponentProps } from "react";
import "./css/styles.scss";

export const Input = ({
  label,
  placeholder = "Placeholder",
  error,
  helperText,
  startIcon,
  endIcon,
  size,
  fullWidth,
  multiline,
  rows,
  inputClassName,
  labelClassName,
  ...restProps
}: Props) => {
  const labelClass = clsx("input-label", {
    "input-label--error": error,
    "input-label--fullwidth": fullWidth,
  }, labelClassName);
  const inputClass = clsx("input", {
    "input--error": error,
    "input--sm": size === "sm",
    "input-with-icon-start": startIcon,
    "input-with-icon-end": endIcon,
    "input--fullwidth": fullWidth,
  }, inputClassName);
  const sharedAttributes = {
    className: inputClass,
    placeholder,
    ...restProps,
  };

  return (
    <label className={labelClass}>
      {label ?? "Label"}
      <div className="input-wrapper">
        {startIcon && (
          <Icon name={startIcon} className="input-icon input-icon--start" />
        )}
        {multiline ? (
          // NOTE: You should use a different component that wraps a textarea, not this
          <textarea
            {...(sharedAttributes as ComponentProps<"textarea">)}
            rows={rows}
          ></textarea>
        ) : (
          <input {...sharedAttributes} />
        )}
        {endIcon && (
          <Icon name={endIcon} className="input-icon input-icon--end" />
        )}
      </div>
      {helperText && <span className="input-helper">{helperText}</span>}
    </label>
  );
};
