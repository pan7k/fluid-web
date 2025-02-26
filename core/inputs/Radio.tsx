import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";
import { sx } from "../theme/utils/sx";
import { Theme } from "../theme/interfaces";

export interface Option {
  label: string;
  value: string;
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
  classes?: Theme["radio"];
}

export const Radio: FC<RadioProps> = ({
  label,
  options,
  defaultValue,
  disabled,
  onChange,
  classes,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div
      className={sx("radio", { "radio-disabled": disabled }, classes?.radio)}
    >
      <span
        className={sx(
          "radio-label",
          { "radio-label-disabled": disabled },
          classes?.label,
        )}
      >
        {label}
      </span>
      {options &&
        options.map((option) => (
          <label
            key={option.value}
            className={sx(
              "radio-stack",
              { "radio-disabled-stack": disabled },
              classes?.stack,
            )}
          >
            <input
              className={sx("radio-input", classes?.input)}
              type="radio"
              name={label}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              disabled={disabled}
              onChange={(e) => handleChange(e)}
            />
            <span className={sx("radio-text", classes?.text)}>
              {option.label}
            </span>
          </label>
        ))}
    </div>
  );
};
