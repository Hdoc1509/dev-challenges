import './Button.scss'

export const Button = ({ variant }) => {
  return <button className={`button--${variant ?? 'default'}`}>Default</button>;
};
