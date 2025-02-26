import React, {
  ReactNode,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  useEffect,
  Ref,
} from "react";
import { useLayerContext } from "../layout/LayerContext";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { sx } from "../theme/utils/sx";

type BaseInputVariant = "normal" | "fluid";
type BaseInputSize = "xs" | "sm" | "md" | "lg";
type BaseInputType = "email" | "text" | "url" | "password" | "number";
type IconPosition = "start" | "end";

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id?: string;
  label?: ReactNode;
  ariaLabel?: string;
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string;
  description?: ReactNode;
  warning?: boolean;
  warningText?: ReactNode;
  invalid?: boolean;
  invalidText?: ReactNode;
  disabled?: boolean;
  type?: BaseInputType;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  iconPosition?: IconPosition;
  variant?: BaseInputVariant;
  size?: BaseInputSize;
  width?: number;
  classes?: string;
  children?: ReactNode;
}

interface BaseProps {
  id?: string;
  ariaLabel?: string;
  children?: ReactNode;
  variant?: BaseInputVariant;
  size: BaseInputSize;
  select?: boolean;
  width?: number;
  disabled?: boolean;
  defaultValue?: string | number;
  layer?: number;
  label?: ReactNode;
  classes?: string;
  type?: BaseInputType;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string | number;
}

const Base = ({
  variant,
  size = "md",
  disabled,
  width,
  classes,
  layer,
  children,
  ...rest
}: BaseProps) => {
  return (
    <div
      style={{ width: width ? `${width}px` : "100%" }}
      className={sx(
        `input input-${variant} input-${size} input-${variant}-${size}`,
        variant === "fluid" ? `input-layer-${layer}-stack` : "",
        { [`input-${variant}-disabled`]: disabled },
        classes,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const Label = ({ variant, size, disabled, label, id }: BaseProps) => (
  <label
    htmlFor={id}
    className={sx(
      `input-text input-text-label input-${variant}-text input-${variant}-label input-${size}-text input-${size}-label input-${variant}-${size}-text input-${variant}-${size}-label`,
      { "input-disabled-text": disabled },
    )}
  >
    {label}
  </label>
);

const Stack = forwardRef<HTMLDivElement, BaseProps>(
  ({ variant, size, disabled, layer, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={sx(
        `input-stack input-${variant}-stack input-${size}-stack input-${variant}-${size}-stack`,
        variant === "normal" ? `input-layer-${layer}-stack` : "",
        { [`input-${variant}-disabled-stack`]: disabled },
      )}
    >
      {children}
    </div>
  ),
);

const InputBase = forwardRef<HTMLInputElement, BaseProps>(
  (
    {
      ariaLabel,
      variant = "normal",
      size,
      disabled,
      select,
      defaultValue,
      ...rest
    },
    ref,
  ) => (
    <input
      ref={ref}
      aria-label={ariaLabel}
      {...rest}
      className={sx(
        `input-input input-${variant}-input input-${size}-input input-${variant}-${size}-input`,
        { "input-disabled-input": disabled },
        select ? "min-w-full" : "w-full",
      )}
    />
  ),
);

const IconBase = ({
  variant,
  size,
  disabled,
  children,
  classes,
}: BaseProps) => (
  <div
    className={sx(
      `input-icon input-${variant}-icon input-${size}-icon input-${variant}-${size}-icon`,
      { "input-disabled-icon": disabled },
      classes,
    )}
  >
    {children}
  </div>
);

const Description = ({ variant, size, disabled, children }: BaseProps) => (
  <div
    className={sx(
      `input-text input-text-description input-${variant}-text input-${variant}-text-description input-${size}-text input-${size}-text-description input-${variant}-${size}-text input-${variant}-${size}-text-description`,
      { "input-disabled-text": disabled },
      { "input-disabled-text-description": children },
    )}
  >
    {children}
  </div>
);

const WarningText = ({ variant, size, disabled, children }: BaseProps) => (
  <div
    className={sx(
      `input-text input-text-warning input-${variant}-text input-${variant}-text-warning input-${size}-text input-${size}-text-warning input-${variant}-${size}-text input-${variant}-${size}-text-warning`,
      { "input-disabled-text": disabled },
      { "input-disabled-text-warning": children },
    )}
  >
    {children}
  </div>
);

const InvalidText = ({ variant, size, disabled, children }: BaseProps) => (
  <div
    className={sx(
      `input-text input-text-invalid input-${variant}-text input-${variant}-text-invalid input-${size}-text input-${size}-text-invalid input-${variant}-${size}-text input-${variant}-${size}-text-invalid`,
      { "input-disabled-text": disabled },
      { "input-disabled-text-invalid": children },
    )}
  >
    {children}
  </div>
);

export const BaseInput = forwardRef<HTMLDivElement, BaseInputProps>(
  (
    {
      id = Math.random().toString(36).substring(7),
      label,
      value,
      defaultValue,
      variant = "normal",
      size = "md",
      type = "text",
      icon,
      iconVariant = "regular",
      iconPosition = "end",
      placeholder,
      description,
      warning,
      warningText,
      invalid,
      invalidText,
      disabled,
      width,
      classes,
      onChange,
      children,
    },
    ref: Ref<HTMLDivElement>,
  ) => {
    const layer = useLayerContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string | number>(
      value ?? defaultValue ?? "",
    );

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
      }
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) onChange(e);
    };

    const toggleFocus = () => {
      inputRef.current?.focus();
    };

    return (
      <Base
        variant={variant}
        size={size}
        disabled={disabled}
        width={width}
        classes={classes}
        layer={layer.level}
      >
        {label && (
          <Label
            id={id}
            variant={variant}
            size={size}
            disabled={disabled}
            label={label}
          />
        )}
        <Stack
          ref={ref}
          variant={variant}
          size={size}
          disabled={disabled}
          layer={layer.level}
          onClick={toggleFocus}
        >
          {icon && iconPosition === "start" && (
            <IconBase variant={variant} size={size} disabled={disabled}>
              <Icon symbol={icon} variant={iconVariant} size={size} />
            </IconBase>
          )}
          {children ? (
            children
          ) : (
            <InputBase
              id={id}
              variant={variant}
              size={size}
              disabled={disabled}
              type={type}
              onChange={handleInputChange}
              placeholder={placeholder}
              value={inputValue}
              ref={inputRef}
            />
          )}
          {invalid && (
            <IconBase variant={variant} size={size} disabled={disabled}>
              <Icon
                symbol="warningCircle"
                variant="fill"
                size={size}
                color="var(--color-text-danger)"
              />
            </IconBase>
          )}
          {warning && !invalid && (
            <IconBase variant={variant} size={size} disabled={disabled}>
              <Icon
                symbol="warning"
                variant="fill"
                size={size}
                color="var(--color-text-warning)"
              />
            </IconBase>
          )}
          {icon && !warning && !invalid && iconPosition === "end" && (
            <IconBase variant={variant} size={size} disabled={disabled}>
              <Icon symbol={icon} variant={iconVariant} size={size} />
            </IconBase>
          )}
        </Stack>
        {variant !== "fluid" && description && !warning && !invalid && (
          <Description variant={variant} size={size} disabled={disabled}>
            {description}
          </Description>
        )}
        {variant !== "fluid" && warning && !invalid && (
          <WarningText variant={variant} size={size} disabled={disabled}>
            {warningText}
          </WarningText>
        )}
        {variant !== "fluid" && invalid && (
          <InvalidText variant={variant} size={size} disabled={disabled}>
            {invalidText}
          </InvalidText>
        )}
      </Base>
    );
  },
);
