import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
} from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { MenuList, MenuDirection } from "../menus/MenuList";
import { MenuItem, MenuItemSize } from "../menus/MenuItem";
import { Chip, ChipColor, ChipVariant } from "../fields/Chip";
import { Icon } from "../icons/Icon";
import { Layer } from "../layout/Layer";
import { sx } from "../theme/utils/sx";

interface Option {
  value: string | number;
  label: string;
}

type Value = string | number | (string | number)[];

export interface SelectInputProps
  extends Omit<BaseInputProps, "value" | "defaultValue" | "onChange" | "type"> {
  options: Option[];
  multiple?: boolean;
  autocomplete?: boolean;
  menuSize?: MenuItemSize;
  chipColor?: ChipColor;
  chipVariant?: ChipVariant;
  direction?: MenuDirection;
  clearable?: boolean;
  defaultValue?: Value;
  value?: Value;
  onChange?: (value: Value) => void;
}

export const SelectInput: FC<SelectInputProps> = ({
  id,
  name,
  label,
  ariaLabel,
  value,
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
  options,
  size = "md",
  multiple = false,
  autocomplete = false,
  menuSize,
  variant,
  chipColor,
  direction,
  clearable = true,
  chipVariant,
  width,
  classes,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    () => {
      if (Array.isArray(value)) {
        return value as (string | number)[];
      } else if (value !== undefined && value !== null) {
        return [value];
      } else if (defaultValue !== undefined && defaultValue !== null) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      } else {
        return [];
      }
    },
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const baseRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stackRef.current &&
        !stackRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside as unknown as EventListener,
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside as unknown as EventListener,
      );
    };
  }, []);

  const filteredOptions = options.filter((option) => {
    if (multiple) {
      return (
        option.label.toLowerCase().includes(String(inputValue).toLowerCase()) &&
        !selectedValues.includes(option.value)
      );
    } else {
      return option.value !== selectedValues[0];
    }
  });

  useEffect(() => {
    if (filteredOptions.length === 0) {
      setDropdownOpen(false);
    }
  }, [filteredOptions]);

  useEffect(() => {
    if (value === undefined || value === null) {
      if (defaultValue !== undefined && defaultValue !== null) {
        setSelectedValues(
          Array.isArray(defaultValue) ? defaultValue : [defaultValue],
        );
      } else {
        setSelectedValues([]);
      }
    } else if (Array.isArray(value)) {
      setSelectedValues(value);
    } else {
      setSelectedValues([value]);
    }
  }, [value]);

  useEffect(() => {
    if (!multiple && selectedValues.length > 0) {
      const selectedOption = options.find(
        (opt) => opt.value === selectedValues[0],
      );
      setInputValue(
        selectedOption ? selectedOption.label : String(selectedValues[0]),
      );
    } else {
      setInputValue("");
    }
  }, [selectedValues, options, multiple]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
    setHighlightedIndex(0);
  };

  const handleOptionSelect = (option: Option) => {
    if (multiple) {
      if (!selectedValues.includes(option.value)) {
        const newValues = [...selectedValues, option.value];
        setSelectedValues(newValues);
        onChange && onChange(newValues);
      }
      setInputValue("");
    } else {
      setSelectedValues([option.value]);
      setInputValue(option.label);
      onChange && onChange(option.value);
      setDropdownOpen(false);
    }
    setHighlightedIndex(null);
  };

  const handleOptionRemove = (value: string | number) => {
    const newValues = selectedValues.filter((v) => v !== value);
    setSelectedValues(newValues);
    setDropdownOpen(true);
    onChange && onChange(newValues);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      !isDropdownOpen &&
      e.key === "ArrowDown" &&
      filteredOptions.length > 0
    ) {
      setDropdownOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (isDropdownOpen) {
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          prev === null || prev >= filteredOptions.length - 1 ? 0 : prev + 1,
        );
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prev) =>
          prev === null || prev <= 0 ? filteredOptions.length - 1 : prev - 1,
        );
        e.preventDefault();
      } else if (e.key === "Enter" && highlightedIndex !== null) {
        handleOptionSelect(filteredOptions[highlightedIndex]);
        setHighlightedIndex(null);
        e.preventDefault();
      } else if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    }

    if (e.key === "Backspace" && inputValue === "" && multiple) {
      const lastValue = selectedValues[selectedValues.length - 1];
      if (lastValue !== undefined) {
        handleOptionRemove(lastValue);
      }
    }
  };

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
        onClick={() => !disabled && setDropdownOpen(true)}
      >
        <div ref={stackRef} className="select-container">
          <Layer classes="select-layer">
            {multiple &&
              selectedValues.map((val) => {
                const option = options.find((opt) => opt.value === val);
                return (
                  <Chip
                    key={val}
                    size={size}
                    color={chipColor}
                    variant={chipVariant}
                  >
                    {option?.label}
                    <Icon
                      symbol="x"
                      size="xs"
                      onClick={() => {
                        handleOptionRemove(val);
                        if (inputRef.current && !isDropdownOpen) {
                          inputRef.current.focus();
                        }
                      }}
                      cursor="pointer"
                    />
                  </Chip>
                );
              })}
            <input
              name={name}
              type="text"
              ref={inputRef}
              value={inputValue}
              aria-label={ariaLabel}
              placeholder={selectedValues.length === 0 ? placeholder : ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setDropdownOpen(true)}
              disabled={disabled}
              readOnly={!autocomplete}
              className={sx(
                `input-input input-${variant}-input input-${size}-input input-${variant}-${size}-input select-input`,
                { "input-disabled-input": disabled },
              )}
            />
          </Layer>
          {clearable && selectedValues.length > 0 && (
            <Icon
              className="clear-icon"
              size="xs"
              symbol="x"
              cursor="pointer"
              color="var(--color-text-secondary)"
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setSelectedValues([]);
                setInputValue("");
                onChange && onChange(multiple ? [] : "");
              }}
            />
          )}
          <Icon
            className="dropdown-icon"
            size="xs"
            symbol={isDropdownOpen ? "caretUp" : "caretDown"}
            cursor="pointer"
            color="var(--color-text-secondary)"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setDropdownOpen(!isDropdownOpen);
              if (inputRef.current && !isDropdownOpen) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </BaseInput>
      {isDropdownOpen && (
        <MenuList
          parentRef={baseRef as RefObject<HTMLDivElement>}
          direction={direction}
          onClose={() => setDropdownOpen(false)}
          selectedValues={selectedValues}
          offset={4}
        >
          {filteredOptions.map((option, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <MenuItem
                key={option.value}
                label={option.label}
                size={menuSize || "md"}
                onClick={() => handleOptionSelect(option)}
                classes={`${isHighlighted ? "menuItem-highlighted" : ""}`}
              />
            );
          })}
        </MenuList>
      )}
    </>
  );
};
