type Props = {
  name: string;
};

export const ButtonVariant = ({
  name,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <div>
      <p>{name}</p>
      {children}
    </div>
  );
};
