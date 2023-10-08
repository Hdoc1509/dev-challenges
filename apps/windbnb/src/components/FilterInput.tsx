import clsx from "clsx";
import "./FilterInput.scss";

type Props = {
  label: string;
  value: string;
  isSelected?: boolean;
  name: string;
};

export const FilterInput = ({ label, value, isSelected, name }: Props) => {
  const filterInputClass = clsx("filter-input", {
    "filter-input--selected": isSelected,
  });

  return (
    <div className={filterInputClass}>
      <label>{label}</label>
      <input name={name} value={value} readOnly />
    </div>
  );
};
