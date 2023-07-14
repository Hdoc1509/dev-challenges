import './Button.scss'

export const Button = ({ variant }) => {
  return <button className={`btn--${variant ?? 'default'}`}>Default</button>;
};
