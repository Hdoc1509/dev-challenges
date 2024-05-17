import type { PropsWithChildren } from "react";
import "./InputVariant.scss";

type Props = {
  legend: string;
};

export const InputVariant = ({
  children,
  legend,
}: PropsWithChildren<Props>) => {
  return (
    <div className="input-variant">
      <p>{legend}</p>
      {children}
    </div>
  );
};
