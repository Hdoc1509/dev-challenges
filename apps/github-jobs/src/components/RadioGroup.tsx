import { RadioChecked, RadioUnchecked } from "./Icons";
import "./RadioGroup.scss";

type RadioProps = {
  label: string;
  icon?: React.ReactNode;
  iconChecked?: React.ReactNode;
} & Omit<React.ComponentProps<"input">, "size" | "color" | "type">;

const Radio = ({ label, icon, iconChecked, ...restProps }: RadioProps) => {
  return (
    <label className="label label--radio">
      <span className="radio">
        <input {...restProps} className="radio__inner" type="radio" />
        <span className="radio__icon">
          {icon ?? <RadioUnchecked />}
          {iconChecked ?? <RadioChecked />}
        </span>
      </span>
      {label}
    </label>
  );
};

type Props<T> = {
  options: T[];
  name: string;
  defaultValue?: T;
  form?: string;
};

export const RadioGroup = <T extends string>({
  options,
  name,
  form,
  defaultValue,
}: Props<T>) => {
  return (
    <div className="radio-group">
      {options.map((label) => (
        <Radio
          key={label}
          label={label}
          name={name}
          form={form}
          defaultChecked={label === defaultValue}
        />
      ))}
    </div>
  );
};
