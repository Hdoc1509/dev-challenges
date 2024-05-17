import "./InputVariant.scss";

type Props = {
  legend: string;
};

export const InputVariant = ({
  children,
  legend,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="input-variant">
      <p>{legend}</p>
      {children}
    </div>
  );
};
