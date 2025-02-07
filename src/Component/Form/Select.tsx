import React from "react";
import { GeneralInputProps } from "./type";

interface SelectProps<T>
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    GeneralInputProps {
  options: T[];
  keyValue?: string;
  keyDisplay?: string;
  displayBuilder?: (t: T) => any;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>(
  (
    {
      className,
      label,
      hint,
      errorMessage,
      helpMessage,
      placeholder = "- Pilih -",
      options,
      keyValue,
      keyDisplay,
      displayBuilder,
      bottomLabelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <label className="form-control w-full">
        {label || helpMessage ? (
          <div className="label">
            <span className="label-text font-bold">{label}</span>
            <span className="label-text-alt">{helpMessage}</span>
          </div>
        ) : (
          ""
        )}
        <select
          className={
            "text-small select select-bordered w-full min-w-32 " + className
          }
          ref={ref}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option, i) => (
            <option
              key={i}
              className="text-small"
              value={
                typeof option != "string" && keyValue
                  ? option[keyValue]
                  : option
              }
            >
              {typeof option !== "string"
                ? displayBuilder
                  ? displayBuilder(option)
                  : keyDisplay
                  ? option[keyDisplay]
                  : option
                : option}
            </option>
          ))}
        </select>
        <div className={"label " + bottomLabelClassName}>
          {hint && <span className="label-text-alt">{hint}</span>}
          {errorMessage && (
            <span className="label-text-alt text-error">{errorMessage}</span>
          )}
        </div>
      </label>
    );
  }
);

export default Select;
