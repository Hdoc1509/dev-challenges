import type { ComponentProps } from "react";
import clsx from "clsx";
import "./FilterInput.scss";

type Props = {
  label: string;
  isSelected?: boolean;
} & Pick<
  ComponentProps<"input">,
  "value" | "name" | "placeholder" | "onClick" | "className"
>;

export const FilterInput = ({
  label,
  value,
  isSelected,
  name,
  placeholder,
  className,
  onClick,
}: Props) => {
  const containerClass = clsx("filter-input", className);
  const wrapperClass = clsx('input-wrapper', { selected: isSelected });

  return (
    <div className={containerClass} onClick={onClick}>
      <div className={wrapperClass}>
        {label}
        <input name={name} value={value} placeholder={placeholder} readOnly />
      </div>
    </div>
  );
};
