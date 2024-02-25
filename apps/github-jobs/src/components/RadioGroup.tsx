import { RadioChecked, RadioUnchecked } from "./Icons";
import "./RadioGroup.scss";

type Props = {
  options: string[];
  name: string;
};

export const RadioGroup = ({ options, name }: Props) => {
  return (
    <div className="radio-group">
      {options.map((label) => (
        <label key={label}>
          <div className="radio-wrapper">
            <input value={label} type="radio" name={name} form="search-form" />
            <span className="radio">
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
