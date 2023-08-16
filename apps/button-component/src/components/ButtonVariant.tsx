import { PropsWithChildren } from 'react';
import './ButtonVariant.scss'

type Props = {
	name: string
}

export const ButtonVariant = ({ name, children }: PropsWithChildren<Props>) => {
  return (
    <span className="button-variant">
      <p className="button-variant__name">{name}</p>
      {children}
    </span>
  );
};
