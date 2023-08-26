import "./Input.scss";

type Props = {
  label: string;
  placeholder: string;
};

export const Input = ({ label, placeholder }: Props) => {
  return (
    <>
      <label className="input-label">
        {label}
        <input type="text" className="input" placeholder={placeholder} />
      </label>
    </>
  );
};
