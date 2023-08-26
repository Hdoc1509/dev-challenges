import clsx from "clsx";
import "./Input.scss";

type Props = {
  label?: string;
  placeholder?: string;
  error?: boolean;
};

export const Input = ({ label, placeholder, error }: Props) => {
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
        />
      </label>
    </>
  );
};
