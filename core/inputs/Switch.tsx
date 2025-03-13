import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { sx } from "../theme/utils/sx";
import { Theme } from "../theme/interfaces";

type SwitchLabelPosition = "left" | "right";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: SwitchLabelPosition;
  disabled?: boolean;
  classes?: Theme["switch"];
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      id,
      label,
      labelPosition = "right",
      defaultChecked = false,
      disabled,
      onChange,
      classes,
      ...rest
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const switchId =
      id || `switch-${Math.random().toString(36).substring(2, 11)}`;
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync the forwarded ref with our internal ref
    useEffect(() => {
      if (!inputRef.current) return;

      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = event.target.checked;
      setIsChecked(newChecked);
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div
        className={sx(
          "switch",
          { "switch-checked": isChecked },
          { "switch-disabled": disabled },
          classes?.switch,
        )}
      >
        {label && labelPosition === "left" && (
          <label
            htmlFor={switchId}
            className={sx("switch-label", {
              "switch-disabled-label": disabled,
            })}
          >
            {label}
          </label>
        )}

        <div
          className={sx(
            "switch-stack",
            { "switch-checked-stack": isChecked },
            { "switch-disabled-stack": disabled },
            { "switch-disabled-checked-stack": isChecked && disabled },
            classes?.stack,
          )}
        >
          <input
            id={switchId}
            ref={inputRef}
            className={sx("switch-input", classes?.input)}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleToggle}
            {...rest}
          />
          <label
            htmlFor={switchId}
            className={sx(
              "switch-knob",
              { "switch-checked-knob": isChecked },
              { "switch-disabled-knob": disabled },
              classes?.knob,
            )}
          />
        </div>

        {label && labelPosition === "right" && (
          <label
            htmlFor={switchId}
            className={sx("switch-label", {
              "switch-disabled-label": disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);
