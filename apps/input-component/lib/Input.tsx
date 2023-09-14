import clsx from "clsx";
import { Icon } from "@hdoc/react-material-icons";
import type { InputProps as Props } from "./types";
import "./css/styles.scss";

export const Input = ({
  label,
  placeholder = "Placeholder",
  error,
  disabled,
  helperText,
  startIcon,
  endIcon,
  value,
  size,
  fullWidth,
  multiline,
  rows,
}: Props) => {
  const labelClass = clsx("input-label", {
    "input-label--error": error,
    "input-label--fullwidth": fullWidth,
  });
  const inputClass = clsx("input", {
    "input--error": error,
    "input--sm": size === "sm",
    "input-with-icon-start": startIcon,
    "input-with-icon-end": endIcon,
    "input--fullwidth": fullWidth,
  });
  const sharedAttributes = {
    className: inputClass,
    placeholder,
    disabled,
    defaultValue: value,
  };

  return (
    <>
      <label className={labelClass}>
        {label ?? "Label"}
        <div className="input-wrapper">
          {startIcon && (
            <Icon name={startIcon} className="input-icon input-icon--start" />
          )}
          {multiline ? (
            <textarea {...sharedAttributes} rows={rows}></textarea>
          ) : (
            <input type="text" {...sharedAttributes} />
          )}
          {endIcon && (
            <Icon name={endIcon} className="input-icon input-icon--end" />
          )}
        </div>
        {helperText && <span className="input-helper">{helperText}</span>}
      </label>
    </>
  );
};
