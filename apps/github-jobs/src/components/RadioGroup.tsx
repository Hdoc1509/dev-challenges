import { RadioChecked, RadioUnchecked } from "./Icons";
import "./RadioGroup.scss";

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
        <label key={label}>
          <div className="radio">
            <input
              value={label}
              type="radio"
              name={name}
              form={form}
              defaultChecked={label === defaultValue}
            />
            <span className="radio__icon">
              <RadioUnchecked />
              <RadioChecked />
            </span>
          </div>
          {label}
        </label>
      ))}
    </div>
  );
};
