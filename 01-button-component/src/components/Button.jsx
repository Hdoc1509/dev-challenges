import "./Button.scss";

export const Button = ({ variant }) => {
  let btnClass = "btn";
  if (variant) btnClass += ` btn--${variant}`;

  return <button className={btnClass}>Default</button>;
};
