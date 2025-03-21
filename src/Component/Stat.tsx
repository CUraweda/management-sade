import React, { ReactNode } from "react";

interface Props extends React.InputHTMLAttributes<HTMLDivElement> {
  label: string;
  value: any;
  icon?: ReactNode;
  valueTip?: any;
  bottomLabel?: string;
  titleClassName?: string;
  titleStyle?: any;
}

const Stat = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      value,
      icon,
      className,
      valueTip,
      bottomLabel,
      titleClassName,
      titleStyle,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={"stats rounded-lg " + className} {...props}>
        <div className="stat p-4">
          <div className="stat-figure">
            <div className="text-4xl">{icon}</div>
          </div>
          <div
            className={"stat-title font-medium mb-2 " + titleClassName}
            style={titleStyle}
          >
            {label}
          </div>
          <div
            className="stat-value tooltip font-semibold flex text-base-content"
            data-tip={valueTip}
          >
            {value}
          </div>
          <div className="stat-desc text-sm">{bottomLabel}</div>
        </div>
      </div>
    );
  }
);

export default Stat;
