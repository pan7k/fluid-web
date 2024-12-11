import React, {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import styled, { CSSObject, useTheme } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { useLayerContext } from "../layout/LayerContext";
import { InputEventProps } from "../common/interfaces";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { MenuItem } from "../buttons/MenuItem";
import { MenuList } from "../buttons/MenuList";
import { Text } from "../typography/Text";
import { Chip } from "../fields/Chip";
import { Layer } from "../layout/Layer";

type BaseInputVariant = "normal" | "fluid";
type BaseInputSize = "xs" | "sm" | "md" | "lg";
type BaseInputType = "email" | "text" | "url" | "password";
type IconType = "adornment" | "warning" | "invalid";
type IconPosition = "start" | "end";

interface Option {
  value: any;
  label: string;
}

interface CSSProps {
  root?: CSSObject;
  label?: CSSObject;
  stack?: CSSObject;
  input?: CSSObject;
  icon?: CSSObject;
  description?: CSSObject;
  warning?: CSSObject;
  invalid?: CSSObject;
}

export interface BaseInputProps extends InputEventProps {
  label?: ReactNode;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  description?: ReactNode;
  warning?: boolean;
  warningText?: ReactNode;
  invalid?: boolean;
  invalidText?: ReactNode;
  disabled?: boolean;
  type?: BaseInputType;
  options?: Array<Option>;
  multiple?: boolean;
  autocomplete?: boolean;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  iconPosition?: IconPosition;
  variant?: BaseInputVariant;
  size?: BaseInputSize;
  width?: number;
  sx?: CSSProps;
}

interface BaseProps {
  theme: Theme;
  $variant: BaseInputVariant;
  $icon?: IconType;
  $size: BaseInputSize;
  $select?: boolean;
  $width?: number;
  $disabled?: boolean;
  $layer?: number;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(
  ({ theme, $variant, $size, $width, $layer, $disabled, $sx }) => {
    let layerStyles = {};
    if ($variant === "fluid") {
      if ($layer === 1) {
        layerStyles = theme.components?.input?.layer?.first?.stack || {};
      } else if ($layer === 2) {
        layerStyles = theme.components?.input?.layer?.second?.stack || {};
      }
    }

    return {
      ...theme.components?.input?.root,
      ...theme.components?.input?.variant?.[$variant]?.root,
      ...theme.components?.input?.size?.[$size]?.root,
      ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.root,
      ...layerStyles,
      ...($disabled && theme.components?.input?.state?.disabled?.root),
      width: $width ? $width : "100%",
      ...$sx,
    };
  },
);

const Label = styled.div<BaseProps>(
  ({ theme, $variant, $size, $disabled, $sx }) => ({
    ...theme.components?.input?.text?.root,
    ...theme.components?.input?.text?.label,
    ...theme.components?.input?.variant?.[$variant]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.text?.label,
    ...theme.components?.input?.size?.[$size]?.text?.root,
    ...theme.components?.input?.size?.[$size]?.text?.label,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text?.label,
    ...($disabled && theme.components?.input?.state?.disabled?.text?.root),
    ...($disabled && theme.components?.input?.state?.disabled?.text?.label),
    ...$sx,
  }),
);

const Stack = styled.div<BaseProps>(
  ({ theme, $variant, $size, $disabled, $layer, $sx }) => {
    let layerStyles = {};
    if ($variant === "normal") {
      if ($layer === 1) {
        layerStyles = theme.components?.input?.layer?.first?.stack || {};
      } else if ($layer === 2) {
        layerStyles = theme.components?.input?.layer?.second?.stack || {};
      }
    }

    return {
      ...theme.components?.input?.stack,
      ...theme.components?.input?.variant?.[$variant]?.stack,
      ...theme.components?.input?.size?.[$size]?.stack,
      ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.stack,
      ...layerStyles,
      ...($disabled && theme.components?.input?.state?.disabled?.stack),
      ...$sx,
    };
  },
);

const InputBase = styled.input<BaseProps>(
  ({ theme, $variant, $size, $select, disabled, $sx }) => ({
    ...theme.components?.input?.input,
    ...theme.components?.input?.variant?.[$variant]?.input,
    ...theme.components?.input?.size?.[$size]?.input,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.input,
    ...(disabled && theme.components?.input?.state?.disabled?.input),
    ...($select ? { minWidth: "100%" } : { width: "100%" }),
    ...$sx,
  }),
);

const IconBase = styled.div<BaseProps>(
  ({ theme, $variant, $icon = "adornment", $size, $disabled, $sx }) => ({
    display: "contents",
    "& svg": {
      ...theme.components?.input?.icon?.root,
      ...theme.components?.input?.icon?.[$icon],
      ...theme.components?.input?.variant?.[$variant]?.icon?.root,
      ...theme.components?.input?.variant?.[$variant]?.icon?.[$icon],
      ...theme.components?.input?.size?.[$size]?.icon?.root,
      ...theme.components?.input?.size?.[$size]?.icon?.[$icon],
      ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.icon
        ?.root,
      ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.icon?.[
        $icon
      ],
      ...($disabled && theme.components?.input?.state?.disabled?.icon?.root),
      ...($disabled && theme.components?.input?.state?.disabled?.icon?.[$icon]),
      ...$sx,
    },
  }),
);

const Description = styled.div<BaseProps>(
  ({ theme, $variant, $size, $disabled, $sx }) => ({
    ...theme.components?.input?.text?.root,
    ...theme.components?.input?.text?.description,
    ...theme.components?.input?.variant?.[$variant]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.text?.description,
    ...theme.components?.input?.size?.[$size]?.text?.root,
    ...theme.components?.input?.size?.[$size]?.text?.description,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text
      ?.description,
    ...($disabled && theme.components?.input?.state?.disabled?.text?.root),
    ...($disabled &&
      theme.components?.input?.state?.disabled?.text?.description),
    ...$sx,
  }),
);

const WarningText = styled.div<BaseProps>(
  ({ theme, $variant, $size, $disabled, $sx }) => ({
    ...theme.components?.input?.text?.root,
    ...theme.components?.input?.text?.warning,
    ...theme.components?.input?.variant?.[$variant]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.text?.warning,
    ...theme.components?.input?.size?.[$size]?.text?.root,
    ...theme.components?.input?.size?.[$size]?.text?.warning,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text
      ?.warning,
    ...($disabled && theme.components?.input?.state?.disabled?.text?.root),
    ...($disabled && theme.components?.input?.state?.disabled?.text?.warning),
    ...$sx,
  }),
);

const InvalidText = styled.div<BaseProps>(
  ({ theme, $variant, $size, $disabled, $sx }) => ({
    ...theme.components?.input?.text?.root,
    ...theme.components?.input?.text?.invalid,
    ...theme.components?.input?.variant?.[$variant]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.text?.invalid,
    ...theme.components?.input?.size?.[$size]?.text?.root,
    ...theme.components?.input?.size?.[$size]?.text?.invalid,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text?.root,
    ...theme.components?.input?.variant?.[$variant]?.size?.[$size]?.text
      ?.invalid,
    ...($disabled && theme.components?.input?.state?.disabled?.text?.root),
    ...($disabled && theme.components?.input?.state?.disabled?.text?.invalid),
    ...$sx,
  }),
);

export const BaseInput: FC<BaseInputProps> = ({
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
  options,
  description,
  warning,
  warningText,
  invalid,
  invalidText,
  disabled,
  width,
  multiple = false,
  autocomplete = false,
  sx,
}) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<string>(
    Array.isArray(value) || Array.isArray(defaultValue)
      ? ""
      : value || defaultValue || "",
  );
  const [formValue, setFormValue] = useState<any>(value || defaultValue || "");
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Array<Option>>(
    options?.filter((option) => option.value === inputValue) || [],
  );
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const layer = useLayerContext();
  const stackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options && selectedOptions.length > 0) {
      setFormValue(selectedOptions.map((option) => option.value));
    }
    if (!options) {
      setFormValue(inputValue);
    }
  }, [selectedOptions, inputValue]);

  useLayoutEffect(() => {
    if (Array.isArray(value) && options) {
      const selected = options.filter((option) => value.includes(option.value));
      setSelectedOptions(selected);
    } else if (Array.isArray(defaultValue) && options) {
      const selected = options.filter((option) =>
        defaultValue.includes(option.value),
      );
      setSelectedOptions(selected);
    }
  }, [value, defaultValue, options]);

  useLayoutEffect(() => {
    const updateMenuPosition = () => {
      if (stackRef.current && isOptionsOpen) {
        let el = stackRef.current as HTMLElement;
        let top = el.offsetTop + el.offsetHeight + 5;
        let left = el.offsetLeft - 3;
        let parent = el.offsetParent as HTMLElement;
        while (parent) {
          top += parent.offsetTop;
          left += parent.offsetLeft - parent.scrollLeft;
          parent = parent.offsetParent as HTMLElement;
        }
        setMenuPosition({ top, left });
      }
    };
    if (isOptionsOpen) {
      updateMenuPosition();
    }
  }, [stackRef, isOptionsOpen, selectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stackRef.current &&
        menuRef.current &&
        !stackRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeOptions();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [stackRef, menuRef]);

  useEffect(() => {
    if (stackRef.current && isOptionsOpen) {
      let el = stackRef.current as HTMLElement;
      let top = el.offsetTop + el.offsetHeight + 5;
      let left = el.offsetLeft - 3;
      let parent = el.offsetParent as HTMLElement;
      while (parent) {
        top += parent.offsetTop;
        left += parent.offsetLeft - parent.scrollLeft;
        parent = parent.offsetParent as HTMLElement;
      }
      setMenuPosition({ top, left });
    }
  }, [stackRef, isOptionsOpen]);

  const handleOptionRemove = (option: Option) => {
    setSelectedOptions(selectedOptions.filter((o) => o.value !== option.value));
    closeOptions();
    toggleFocus();
  };

  const toggleOptions = () => {
    if (stackRef.current) {
      filteredOptions?.length !== 0 && setOptionsOpen((prev) => !prev);
    }
  };

  const toggleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeOptions = () => {
    setOptionsOpen(false);
    setHighlightedIndex(null);
  };

  const filteredOptions = options?.filter(
    (option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedOptions.some(
        (selectedOption) => selectedOption.value === option.value,
      ),
  );

  useEffect(() => {
    if (filteredOptions && filteredOptions.length === 0) {
      closeOptions();
    }
  }, [filteredOptions]);

  const handleOptionSelect = (option: Option) => {
    if (multiple) {
      toggleFocus();
      if (!selectedOptions.some((o) => o.value === option.value)) {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
    setInputValue("");
    setOptionsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

    if (autocomplete && filteredOptions && filteredOptions.length > 0) {
      setOptionsOpen(true);
    }

    if (!multiple && autocomplete) {
      setSelectedOptions(selectedOptions);
    } else if (!multiple) {
      setSelectedOptions([]);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      autocomplete &&
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedOptions.length > 0 &&
      (multiple || autocomplete)
    ) {
      handleOptionRemove(selectedOptions[selectedOptions.length - 1]);
      setHighlightedIndex(0);
    }

    if (isOptionsOpen && filteredOptions) {
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) =>
          prevIndex === null || prevIndex === filteredOptions.length - 1
            ? 0
            : prevIndex + 1,
        );
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0
            ? filteredOptions.length - 1
            : prevIndex - 1,
        );
      } else if (
        (e.key === "Enter" || e.key === " ") &&
        highlightedIndex !== null
      ) {
        handleOptionSelect(filteredOptions[highlightedIndex]);
        setHighlightedIndex(0);
        e.preventDefault();
      } else if (e.key === "Escape") {
        closeOptions();
        setHighlightedIndex(0);
      }
    }
    if (
      !isOptionsOpen &&
      e.key === "ArrowDown" &&
      filteredOptions &&
      filteredOptions.length > 0
    ) {
      setOptionsOpen(true);
      setHighlightedIndex(0);
    }
  };

  const displayValue = inputValue;
  const placeholderText =
    inputValue === "" && (!options || selectedOptions.length === 0)
      ? placeholder
      : "";

  return (
    <Base
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $layer={layer.level}
      $width={width}
      $sx={sx?.root}
    >
      {label && (
        <Label
          $variant={variant}
          $size={size}
          $disabled={disabled}
          $sx={sx?.label}
        >
          {label}
        </Label>
      )}
      <Stack
        ref={stackRef}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $layer={layer.level}
        $sx={sx?.stack}
        onClick={() => {
          toggleFocus();
          if (options) {
            toggleOptions();
          }
        }}
      >
        {icon && iconPosition === "start" && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="adornment"
            $sx={sx?.icon}
          >
            <Icon symbol={icon} variant={iconVariant} size={size} />
          </IconBase>
        )}
        {isOptionsOpen && (
          <MenuList ref={menuRef} position={menuPosition} minWidth={width}>
            <>
              {filteredOptions?.map((option, index) => (
                <MenuItem
                  label={option.label}
                  size={size}
                  key={option.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionSelect(option);
                  }}
                  sx={{
                    background:
                      index === highlightedIndex
                        ? theme.surface[20]
                        : "transparent",
                  }}
                />
              ))}
            </>
          </MenuList>
        )}
        {options && (
          <>
            <div
              style={{
                gap: "4px",
                display: "flex",
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: "0%",
                flexWrap: "wrap",
                position: "relative",
                boxSizing: "border-box",
                alignItems: "center",
              }}
            >
              {selectedOptions.map((option: Option) =>
                multiple ? (
                  <Layer key={option.value} sx={{ padding: 0, margin: 0 }}>
                    <Chip>
                      {option.label}
                      <Icon
                        symbol="x"
                        size="xs"
                        cursor="pointer"
                        color="gray"
                        onClick={() => handleOptionRemove(option)}
                      />
                    </Chip>
                  </Layer>
                ) : (
                  <Text key={option.value} sx={{ whiteSpace: "nowrap" }}>
                    {option.label}
                  </Text>
                ),
              )}
              <div
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: "auto",
                  display: "inline-grid",
                  gridRowStart: "1",
                  gridColumnStart: "1",
                  gridRowEnd: "2",
                  gridColumnEnd: "3",
                  gridTemplateColumns: "0px min-content",
                }}
              >
                <InputBase
                  $variant={variant}
                  $size={size}
                  $sx={sx?.input}
                  $select={true}
                  disabled={disabled}
                  type={type}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  readOnly={!autocomplete && options ? true : false}
                  placeholder={placeholderText}
                  value={displayValue}
                  ref={inputRef}
                />
              </div>
            </div>

            <IconBase
              $variant={variant}
              $size={size}
              $disabled={disabled}
              $icon="adornment"
              $sx={sx?.icon}
              style={{ justifySelf: "flex-end" }}
            >
              <Icon
                symbol={isOptionsOpen ? "chevronUp" : "chevronDown"}
                variant="regular"
                cursor="pointer"
                size="xs"
              />
            </IconBase>
          </>
        )}
        {!options && (
          <InputBase
            $variant={variant}
            $size={size}
            $sx={sx?.input}
            disabled={disabled}
            type={type}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            readOnly={!autocomplete && options ? true : false}
            placeholder={placeholderText}
            value={displayValue}
            ref={inputRef}
          />
        )}
        {options &&
          !multiple &&
          selectedOptions.map((option) => (
            <Icon
              key={option.value}
              symbol="close"
              size="xs"
              cursor="pointer"
              color="gray"
              onClick={() => handleOptionRemove(option)}
            />
          ))}
        {icon && !warning && !invalid && iconPosition === "end" && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="adornment"
            $sx={sx?.icon}
          >
            <Icon symbol={icon} variant={iconVariant} size={size} />
          </IconBase>
        )}
        {warning && !invalid && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="warning"
            $sx={sx?.icon}
          >
            <Icon symbol="warning" variant="fill" size={size} color="orange" />
          </IconBase>
        )}
        {invalid && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="invalid"
            $sx={sx?.icon}
          >
            <Icon
              symbol="warningCircle"
              variant="fill"
              size={size}
              color="red"
            />
          </IconBase>
        )}
      </Stack>
      {variant !== "fluid" && description && !warning && !invalid && (
        <Description
          $variant={variant}
          $size={size}
          $disabled={disabled}
          $sx={sx?.description}
        >
          {description}
        </Description>
      )}
      {variant !== "fluid" && warning && !invalid && (
        <WarningText
          $variant={variant}
          $size={size}
          $disabled={disabled}
          $sx={sx?.warning}
        >
          {warningText}
        </WarningText>
      )}
      {variant !== "fluid" && invalid && (
        <InvalidText
          $variant={variant}
          $size={size}
          $disabled={disabled}
          $sx={sx?.invalid}
        >
          {invalidText}
        </InvalidText>
      )}
    </Base>
  );
};
