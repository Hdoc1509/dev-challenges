import clsx from "clsx";
import "./css/styles.scss";

type Props = {
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
};

export const Input = ({
  label,
  placeholder,
  error,
  disabled,
  helperText,
}: Props) => {
  const labelClass = clsx("input-label", {
    "input-label--error": error,
  });
  const inputClass = clsx("input", {
    "input--error": error,
  });

  return (
    <>
      <label className={labelClass}>
        {label ?? "Label"}
        <input
          type="text"
          className={inputClass}
          placeholder={placeholder ?? "Placeholder"}
          disabled={disabled}
        />
        {helperText && <span className="input-helper">{helperText}</span>}
      </label>
    </>
  );
};
