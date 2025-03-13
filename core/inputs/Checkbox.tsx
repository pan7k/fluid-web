import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  Ref,
} from "react";
import { sx } from "../theme/utils/sx";
import { Theme } from "../theme/interfaces";

type CheckboxLabelPosition = "left" | "right";

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  labelPosition?: CheckboxLabelPosition;
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
  classes?: Theme["checkbox"];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      labelPosition = "right",
      disabled,
      indeterminate,
      classes,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const [isLabelTruncated, setIsLabelTruncated] = useState(false);

    useEffect(() => {
      if (!inputRef.current) return;

      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    useEffect(() => {
      const checkTruncation = () => {
        if (labelRef.current) {
          setIsLabelTruncated(
            labelRef.current.scrollWidth > labelRef.current.offsetWidth,
          );
        }
      };

      checkTruncation();
      window.addEventListener("resize", checkTruncation);
      return () => window.removeEventListener("resize", checkTruncation);
    }, [label]);

    const handleClick = useCallback(
      (e: MouseEvent) => {
        if (e.target === inputRef.current) return;
        if (disabled || !inputRef.current) return;
        inputRef.current.click();
      },
      [disabled, inputRef?.current],
    );

    return (
      <div
        className={sx(
          "checkbox",
          { "checkbox-disabled": disabled },
          classes?.checkbox,
        )}
        onClick={handleClick}
      >
        {label && labelPosition === "left" && (
          <span ref={labelRef} title={isLabelTruncated ? label : undefined}>
            {label}
          </span>
        )}
        <input
          className={sx("checkbox-input", classes?.input)}
          id={id || Math.floor(Math.random() * 10000).toString()}
          ref={inputRef}
          type="checkbox"
          {...rest}
        />
        {label && labelPosition === "right" && (
          <span ref={labelRef} title={isLabelTruncated ? label : undefined}>
            {label}
          </span>
        )}
      </div>
    );
  },
);
