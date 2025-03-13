import React, { FC, useRef, useEffect, forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Layer } from "../layout/Layer";
import { sx } from "../theme/utils/sx";

export interface TextAreaProps
  extends Omit<
    BaseInputProps,
    "value" | "defaultValue" | "onChange" | "type" | "multiple"
  > {
  defaultValue?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      ariaLabel,
      value,
      rows = 1,
      defaultValue,
      placeholder,
      description,
      icon,
      iconPosition,
      warning,
      warningText,
      invalid,
      invalidText,
      disabled,
      size = "md",
      variant,
      width,
      classes,
      onChange,
    },
    ref,
  ) => {
    const baseRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // sync the forwarded ref with internal ref
    useEffect(() => {
      if (!textareaRef.current) return;

      if (typeof ref === "function") {
        ref(textareaRef.current);
      } else if (ref) {
        ref.current = textareaRef.current;
      }
    }, [ref]);

    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [value, rows]);

    return (
      <>
        <BaseInput
          ref={baseRef}
          id={id}
          label={label}
          ariaLabel={ariaLabel}
          icon={icon}
          iconPosition={iconPosition}
          placeholder={placeholder}
          description={description}
          warning={warning}
          size={size}
          warningText={warningText}
          invalid={invalid}
          variant={variant}
          invalidText={invalidText}
          disabled={disabled}
          width={width}
          classes={classes}
        >
          <Layer classes="select-layer">
            <textarea
              ref={textareaRef}
              name={name}
              rows={rows}
              aria-label={ariaLabel}
              placeholder={placeholder}
              disabled={disabled}
              className={sx(
                `input-input input-${variant}-input input-${size}-input input-${variant}-${size}-input textarea-input ${size}`,
                { "input-disabled-input": disabled },
              )}
              value={value}
              defaultValue={defaultValue}
              onChange={(e) => {
                onChange?.(e.target.value);
                adjustHeight();
              }}
            />
          </Layer>
        </BaseInput>
      </>
    );
  },
);
