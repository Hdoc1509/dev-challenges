import clsx from "clsx";
import { ComponentProps } from "react";
import { Icon } from "@hdoc/react-material-icons";
import "./css/styles.scss";

type IconProps = ComponentProps<typeof Icon>;

type Props = {
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  startIcon?: IconProps["name"];
  endIcon?: IconProps["name"];
};

export const Input = ({
  label,
  placeholder,
  error,
  disabled,
  helperText,
  startIcon,
  endIcon,
}: Props) => {
  const labelClass = clsx("input-label", {
    "input-label--error": error,
  });
  const inputClass = clsx("input", {
    "input--error": error,
    "input-with-icon-start": startIcon,
    "input-with-icon-end": endIcon,
  });

  return (
    <>
      <label className={labelClass}>
        {label ?? "Label"}
        <div className="input-container">
          {startIcon && (
            <Icon name={startIcon} className="input-icon input-icon--start"/>
          )}
          <input
            type="text"
            className={inputClass}
            placeholder={placeholder ?? "Placeholder"}
            disabled={disabled}
          />
          {endIcon && (
            <Icon name={endIcon} className="input-icon input-icon--end"/>
          )}
        </div>
        {helperText && <span className="input-helper">{helperText}</span>}
      </label>
    </>
  );
};
