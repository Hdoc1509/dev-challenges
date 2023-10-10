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
  const wrapperClass = clsx({ selected: isSelected });

  return (
    <div className="filter-input" onClick={onClick}>
      <span className={wrapperClass}>
        {label}
        <input name={name} value={value} placeholder={placeholder} readOnly />
      </span>
    </div>
  );
};
