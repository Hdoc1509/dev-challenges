import clsx from "clsx";
import { Icon } from "@hdoc/react-material-icons";
import type { InputProps as Props } from "./types";
import "./css/styles.scss";

export const Input = ({
  label,
  placeholder,
  error,
  disabled,
  helperText,
  startIcon,
  endIcon,
  value,
  size,
  fullWidth
}: Props) => {
  const labelClass = clsx("input-label", {
    "input-label--error": error,
    "input-label--fullwidth": fullWidth
  });
  const inputClass = clsx("input", {
    "input--error": error,
    "input--sm": size === "sm",
    "input-with-icon-start": startIcon,
    "input-with-icon-end": endIcon,
    "input--fullwidth": fullWidth
  });

  return (
    <>
      <label className={labelClass}>
        {label ?? "Label"}
        <div className="input-container">
          {startIcon && (
            <Icon name={startIcon} className="input-icon input-icon--start" />
          )}
          <input
            type="text"
            className={inputClass}
            placeholder={placeholder ?? "Placeholder"}
            disabled={disabled}
            defaultValue={value}
          />
          {endIcon && (
            <Icon name={endIcon} className="input-icon input-icon--end" />
          )}
        </div>
        {helperText && <span className="input-helper">{helperText}</span>}
      </label>
    </>
  );
};
