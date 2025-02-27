import React, { FC, useState, useRef, useEffect, MouseEvent } from "react";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";
import { Slider } from "./Slider";
import { IconButton } from "../buttons/IconButton";
import { Layer } from "../layout/Layer";

interface HSVColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

export interface ColorPickerProps {
  value: string; // hex (#FF0000) or rgba(255,0,0,1)
  onChange: (value: string) => void;
  disabled?: boolean;
  classes?: Theme["colorPicker"];
}

const hexToHSV = (hex: string): HSVColor => {
  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  if (hex.startsWith("rgba")) {
    const matches = hex.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
    if (matches) {
      r = parseInt(matches[1]);
      g = parseInt(matches[2]);
      b = parseInt(matches[3]);
      a = parseFloat(matches[4]);
    }
  } else {
    const cleaned = hex.replace("#", "");
    r = parseInt(cleaned.substring(0, 2), 16);
    g = parseInt(cleaned.substring(2, 4), 16);
    b = parseInt(cleaned.substring(4, 6), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  let h;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100, a };
};

const HSVToRGBA = (hsv: HSVColor): string => {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;

  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default:
      r = v;
      g = p;
      b = q;
      break;
  }

  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${hsv.a})`;
};

export const ColorPicker: FC<ColorPickerProps> = ({
  value,
  onChange,
  disabled = false,
  classes,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hsv, setHSV] = useState<HSVColor>(hexToHSV(value));
  const pickerRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHSV(hexToHSV(value));
  }, [value]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener,
      );
    }
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener,
      );
    };
  }, [isOpen]);

  const handleSaturationChange = (e: MouseEvent) => {
    if (!saturationRef.current) return;

    const rect = saturationRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const newHSV = {
      ...hsv,
      s: x * 100,
      v: (1 - y) * 100,
    };
    setHSV(newHSV);
    onChange(HSVToRGBA(newHSV));
  };

  const handleHueChange = (hue: number) => {
    const newHSV = { ...hsv, h: hue };
    setHSV(newHSV);
    onChange(HSVToRGBA(newHSV));
  };

  const handleAlphaChange = (alpha: number) => {
    const newHSV = { ...hsv, a: alpha / 100 };
    setHSV(newHSV);
    onChange(HSVToRGBA(newHSV));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value).catch((err) => {
      console.error("Failed to copy color to clipboard.", err);
    });
  };

  return (
    <div
      ref={pickerRef}
      className={sx(
        "colorPicker",
        { "colorPicker-disabled": disabled },
        classes?.colorPicker,
      )}
    >
      <button
        className={sx("colorPicker-trigger", classes?.trigger)}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div
          className={sx("colorPicker-swatch", classes?.swatch)}
          style={{ backgroundColor: value }}
        />
      </button>
      {isOpen && (
        <div className={sx("colorPicker-dropdown", classes?.dropdown)}>
          <div
            ref={saturationRef}
            className={sx("colorPicker-saturation", classes?.saturation)}
            style={{
              backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
            }}
            onMouseDown={(e) => {
              handleSaturationChange(e);
              const handleMove = (e: MouseEvent) => {
                const mouseEvent = e as unknown as MouseEvent;
                handleSaturationChange(mouseEvent);
              };
              const handleUp = () => {
                document.removeEventListener(
                  "mousemove",
                  handleMove as unknown as EventListener,
                );
                document.removeEventListener("mouseup", handleUp);
              };
              document.addEventListener(
                "mousemove",
                handleMove as unknown as EventListener,
              );
              document.addEventListener("mouseup", handleUp);
            }}
          >
            <div
              className={sx(
                "colorPicker-saturation-pointer",
                classes?.saturationPointer,
              )}
              style={{
                left: `${hsv.s}%`,
                top: `${100 - hsv.v}%`,
                backgroundColor: HSVToRGBA(hsv),
              }}
            />
          </div>

          <div className={sx("colorPicker-controls", classes?.controls)}>
            <Slider
              value={hsv.h}
              onChange={(h) => handleHueChange(h as number)}
              min={0}
              max={360}
              step={1}
              classes={{
                slider: "colorPicker-hue",
                track: "colorPicker-track",
                fill: "colorPicker-fill",
                thumb: "colorPicker-thumb",
              }}
            />

            <Slider
              value={hsv.a * 100}
              onChange={(a) => handleAlphaChange(a as number)}
              min={0}
              max={100}
              step={1}
              classes={{
                slider: "colorPicker-alpha",
                track: "colorPicker-track",
                fill: "colorPicker-fill",
                thumb: "colorPicker-thumb",
              }}
            />
          </div>

          <div className={sx("colorPicker-info", classes?.info)}>
            <div className={sx("colorPicker-value", classes?.value)}>
              {value}
              <IconButton
                icon="copy"
                variant="ghost"
                color="secondary"
                size="xs"
                onClick={handleCopyToClipboard}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
