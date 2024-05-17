type Props = {
  name: string;
};

export const ButtonVariant = ({
  name,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <span className="button-variant">
      <p className="button-variant__name">{name}</p>
      {children}
    </span>
  );
};
