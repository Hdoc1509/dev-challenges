import clsx from "clsx";
import "./FilterInput.scss";

type Props = {
  label: string;
  value?: string;
  isSelected?: boolean;
  name: string;
  placeholder?: string;
  onClick: () => void;
};

export const FilterInput = ({
  label,
  value,
  isSelected,
  name,
  placeholder,
  onClick,
}: Props) => {
  const labelClass = clsx({ selected: isSelected });

  return (
    <div className="filter-input" onClick={onClick}>
      <label className={labelClass}>
        {label}
        <input name={name} value={value} placeholder={placeholder} readOnly />
      </label>
    </div>
  );
};
