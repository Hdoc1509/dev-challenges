import "./Tooltip.scss";

type Props = {
  content: React.ReactNode;
  trigger: React.ReactNode;
};

export function Tooltip({ content, trigger }: Props) {
  return (
    <label className="tooltip">
      <input type="checkbox" className="tooltip__checkbox" hidden />
      <span className="tooltip__icon">{trigger}</span>
      <span className="tooltip__content">{content}</span>
    </label>
  );
}
