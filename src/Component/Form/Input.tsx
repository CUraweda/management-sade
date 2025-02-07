import React from "react";
import { InputProps } from "./type";

export interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputProps {
  slotLeft?: React.ReactNode;
  slotRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      type,
      label,
      hint,
      errorMessage,
      helpMessage,
      placeholder = "Ketik disini",
      slotLeft,
      slotRight,
      inputSize,
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
        <div
          className={`input-${inputSize} input input-bordered flex items-center gap-1 p-0`}
        >
          {slotLeft ? <div className="ps-4">{slotLeft}</div> : ""}
          <input
            type={type}
            placeholder={placeholder}
            className={
              (type == "file"
                ? "file-input file-input-ghost"
                : "input input-ghost") +
              " w-full min-w-32 grow !border-0 focus:border-0" +
              className
            }
            ref={ref}
            {...props}
          />
          {slotRight ? <div className="pe-4">{slotRight}</div> : ""}
        </div>
        <div className="label">
          {hint && <span className="label-text-alt">{hint}</span>}
          {errorMessage && (
            <span className="label-text-alt text-error">{errorMessage}</span>
          )}
        </div>
      </label>
    );
  }
);
Input.displayName = "Input";

export default Input;
