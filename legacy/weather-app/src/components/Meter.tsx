import clsx from "clsx";
import "./Meter.scss";

type Props = {
  value?: number;
  marks?: boolean;
  unit?: string;
  trackFallback?: React.ReactNode;
  label?: string;
} & React.ComponentProps<"meter">;

export const Meter = ({
  value,
  marks,
  unit,
  trackFallback,
  label,
  className,
  ...props
}: Props) => {
  return (
    <span
      {...props}
      className={clsx("meter", className)}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      {marks && (
        <span className="meter__marks">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </span>
      )}
      <span className="meter__bar">
        {value == null ? (
          trackFallback
        ) : (
          <span className="meter__track" style={{ width: `${value}%` }}></span>
        )}
      </span>
      {unit && <span className="meter__unit">{unit}</span>}
    </span>
  );
};
