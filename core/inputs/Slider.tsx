import React, { FC, useRef, useState, useEffect } from "react";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";

export interface SliderProps {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  classes?: Theme["slider"];
}

export const Slider: FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  range = false,
  classes,
}) => {
  const [isDragging, setIsDragging] = useState<false | "start" | "end">(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateValue = (clientX: number) => {
    if (!sliderRef.current) return typeof value === "number" ? value : value[0];

    const { left, width } = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - left) / width));
    const newValue = Math.round((percentage * (max - min) + min) / step) * step;
    return Math.max(min, Math.min(max, newValue));
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    thumb: "start" | "end" = "start",
  ) => {
    if (disabled) return;
    e.stopPropagation();
    setIsDragging(thumb);

    if (range && Array.isArray(value)) {
      const newValue = calculateValue(e.clientX);
      const [start, end] = value;
      if (thumb === "start") {
        onChange([Math.min(newValue, end), end]);
      } else {
        onChange([start, Math.max(start, newValue)]);
      }
    } else {
      onChange(calculateValue(e.clientX));
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = calculateValue(e.clientX);
      if (range && Array.isArray(value)) {
        const [start, end] = value;
        if (isDragging === "start") {
          onChange([Math.min(newValue, end), end]);
        } else {
          onChange([start, Math.max(start, newValue)]);
        }
      } else {
        onChange(newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onChange, value, range]);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className={sx("slider", { "slider-disabled": disabled }, classes?.slider)}
      onMouseDown={(e) => {
        e.stopPropagation();
        if (!range) handleMouseDown(e);
      }}
    >
      <div className={sx("slider-track", classes?.track)}>
        <div
          className={sx("slider-fill", classes?.fill)}
          style={
            range && Array.isArray(value)
              ? {
                  left: `${getPercentage(value[0])}%`,
                  width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
                }
              : {
                  width: `${getPercentage(typeof value === "number" ? value : value[0])}%`,
                }
          }
        />
      </div>
      {range && Array.isArray(value) ? (
        <>
          <div
            className={sx("slider-thumb", classes?.thumb)}
            style={{ left: `${getPercentage(value[0])}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e, "start");
            }}
          />
          <div
            className={sx("slider-thumb", classes?.thumb)}
            style={{ left: `${getPercentage(value[1])}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e, "end");
            }}
          />
        </>
      ) : (
        <div
          className={sx("slider-thumb", classes?.thumb)}
          style={{
            left: `${getPercentage(typeof value === "number" ? value : value[0])}%`,
          }}
        />
      )}
    </div>
  );
};
