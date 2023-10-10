import { ComponentProps } from "react";
import clsx from "clsx";
import "./FilterInput.scss";

type Props = {
  label: string;
  isSelected?: boolean;
} & Pick<ComponentProps<"input">, "value" | "name" | "placeholder" | "onClick">;

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
