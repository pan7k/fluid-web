import React, { FC } from "react";
import { ComponentSize } from "../common/types";
import { useTheme } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { isDark } from "../theme/colors";

export type IconSymbol =
  | "add"
  | "chevronUp"
  | "chevronRight"
  | "chevronDown"
  | "chevronLeft"
  | "circle"
  | "close"
  | "cursor"
  | "draw"
  | "edit"
  | "error"
  | "export"
  | "fullscreen"
  | "label"
  | "layers"
  | "list"
  | "location"
  | "locationAdd"
  | "measure"
  | "merge"
  | "minus"
  | "palette"
  | "polygon"
  | "restoreWindow"
  | "save"
  | "search"
  | "settings"
  | "square"
  | "transform"
  | "trash"
  | "user"
  | "warning";

export type IconVariant = "filled" | "outlined";

export interface IconProps {
  symbol: IconSymbol;
  variant?: IconVariant;
  size?: ComponentSize;
  color?: string;
  onClick?: () => void;
  cursor?: string;
}

interface BaseProps {
  fill: string;
  variant?: IconVariant;
  $orientation?: "top" | "right" | "bottom" | "left";
}

const Add: FC<BaseProps> = ({ fill }) => (
  <path
    d="M17,15l0,-9l-2,0l0,9l-9,0l0,2l9,0l0,9l2,0l0,-9l9,0l0,-2l-9,0Z"
    fill={fill}
  />
);

export const Chevron: FC<BaseProps> = ({ fill, $orientation = "right" }) => {
  const rotation = {
    top: "rotate(-90deg)",
    right: "rotate(0deg)",
    bottom: "rotate(90deg)",
    left: "rotate(180deg)",
  }[$orientation];

  return (
    <path
      d="M21.157,16l-8.914,9l-1.4,-1.4l7.514,-7.6l-7.505,-7.6l1.4,-1.4l8.905,9Z"
      fill={fill}
      style={{ transform: rotation, transformOrigin: "16px 16px" }}
    />
  );
};

const Circle: FC<BaseProps> = ({ fill }) => (
  <path
    d="M16,5c6.071,0 11,4.929 11,11c0,6.071 -4.929,11 -11,11c-6.071,0 -11,-4.929 -11,-11c0,-6.071 4.929,-11 11,-11Zm0,2c-4.967,0 -9,4.033 -9,9c0,4.967 4.033,9 9,9c4.967,0 9,-4.033 9,-9c0,-4.967 -4.033,-9 -9,-9Z"
    fill={fill}
  />
);

const Close: FC<BaseProps> = ({ fill }) => (
  <path
    d="M17.414,16l7.586,-7.586l-1.414,-1.414l-7.586,7.586l-7.586,-7.586l-1.414,1.414l7.586,7.586l-7.586,7.586l1.414,1.414l7.586,-7.586l7.586,7.586l1.414,-1.414l-7.586,-7.586Z"
    fill={fill}
  />
);

const Cursor: FC<BaseProps> = ({ fill }) => (
  <path
    d="M10,4l15,14l-4.456,2.171l2.635,4.745l-5.361,2.553l-2.705,-4.793l-5.113,2.324l0,-21Zm2,4.602l-0,13.292l3.953,-1.797l2.69,4.764l1.754,-0.835l-2.626,-4.728l3.737,-1.821l-9.508,-8.875Z"
    fill={fill}
  />
);

const Draw: FC<BaseProps> = ({ fill }) => (
  <path
    d="M7.221,14.625l8.959,-8.809l3.989,1.686l-11.967,11.967l1.577,4.715l13,-13l2,4l-10,10l5,1l2.787,-2.788"
    strokeWidth="2px"
    fill="none"
    stroke={fill}
  />
);

const Edit: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M6,24l0,-4l16,-16l4,4l-16,16l-4,0Zm2,-2l1.172,-0c-0,-0 14,-14 14,-14l-1.172,-1.172l-14,14l0,1.172Z"
      fill={fill}
    />
    <path d="M4,28l-0,-2l24,0l-0,2l-24,0Z" fill={fill} />
  </>
);

const Error: FC<BaseProps> = ({ fill }) => {
  const inverted =
    fill === "currentColor" ? "transparent" : isDark(fill) ? "#fff" : "#000";

  return (
    <>
      <path
        d="M16,3c-7,0 -13,6 -13,13c0,7 6,13 13,13c7,0 13,-6 13,-13c0,-7 -6,-13 -13,-13Zm-1,6l2,0l0,10l-2,0l0,-10Zm1,15c-0.8,0 -1.5,-0.7 -1.5,-1.5c0,-0.8 0.7,-1.5 1.5,-1.5c0.8,0 1.5,0.7 1.5,1.5c0,0.8 -0.7,1.5 -1.5,1.5Z"
        fill={fill}
      />
      <path
        d="M17.5,22.5c0,0.8 -0.7,1.5 -1.5,1.5c-0.8,0 -1.5,-0.7 -1.5,-1.5c0,-0.8 0.7,-1.5 1.5,-1.5c0.8,0 1.5,0.7 1.5,1.5Zm-0.5,-13.5l-2,0l0,10l2,0l0,-10Z"
        fill={inverted}
      />
    </>
  );
};

const Export: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      id="base"
      d="M25,22l0,4l-17.992,-0l-0,-4l-2,-0l-0,6l21.992,0l0,-6l-2,0Z"
      fill={fill}
    />
    <path
      id="arrow"
      d="M6,14l1.411,1.405l7.589,-7.58l0,14.175l2,0l0,-14.175l7.591,7.58l1.409,-1.405l-10,-10l-10,10Z"
      fill={fill}
    />
  </>
);

const Fullscreen: FC<BaseProps> = ({ fill }) => (
  <>
    <path d="M6,6l6,0l0,2l-4,0l0,4l-2,0l0,-6Z" fill={fill} />
    <path d="M26,6l0,6l-2,0l0,-4l-4,0l0,-2l6,0Z" fill={fill} />
    <path d="M26,26l-6,0l0,-2l4,0l0,-4l2,0l0,6Z" fill={fill} />
    <path d="M6,26l-0,-6l2,0l-0,4l4,-0l-0,2l-6,0Z" fill={fill} />
  </>
);

const Label: FC<BaseProps> = ({ fill }) => (
  <path
    d="M4,9l18,0l6,7l-6,7l-18,0l0,-14Zm2,2l-0,10c-0,0 15.08,0 15.08,0c0,0 4.286,-5 4.286,-5l-4.286,-5l-15.08,-0Z"
    fill={fill}
  />
);

const List: FC<BaseProps> = ({ fill }) => (
  <>
    <rect x="10" y="9" width="16" height="2" fill={fill} />
    <rect x="10" y="21" width="16" height="2" fill={fill} />
    <rect x="10" y="15" width="16" height="2" fill={fill} />
    <rect x="6" y="15" width="2" height="2" fill={fill} />
    <rect x="6" y="9" width="2" height="2" fill={fill} />
    <rect x="6" y="21" width="2" height="2" fill={fill} />
  </>
);

const Location: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M16,28c0,0 -10,-7 -10,-14c0,-6 5.004,-10 10.004,-10c5,0 9.996,4 9.996,10c0,7 -10,14 -10,14Zm0,-2.51c1.222,-0.976 3.213,-2.698 4.931,-4.803c1.624,-1.99 3.069,-4.318 3.069,-6.687c0,-4.8 -3.996,-8 -7.996,-8c-4,0 -8.004,3.2 -8.004,8c0,2.369 1.445,4.697 3.069,6.687c1.718,2.105 3.709,3.827 4.931,4.803Z"
      fill={fill}
    />
    <circle cx="16" cy="14" r="3" fill={fill} />
  </>
);

const LocationAdd: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M16,28c0,0 -10,-7 -10,-14c0,-6 5.004,-10 10.004,-10c5,0 9.996,4 9.996,10c0,7 -10,14 -10,14Zm0,-2.51c1.222,-0.976 3.213,-2.698 4.931,-4.803c1.624,-1.99 3.069,-4.318 3.069,-6.687c0,-4.8 -3.996,-8 -7.996,-8c-4,0 -8.004,3.2 -8.004,8c0,2.369 1.445,4.697 3.069,6.687c1.718,2.105 3.709,3.827 4.931,4.803Z"
      fill={fill}
    />
    <path
      d="M15,13l0,-3l2,0l0,3l3,0l0,2l-3,0l0,3l-2,0l0,-3l-3,0l0,-2l3,0Z"
      fill={fill}
    />
  </>
);

const Layers: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M5,18.899l1.7,-1.236l9.3,6.763l9.307,-6.769l1.693,1.242l-11,8l-11,-8Z"
      fill={fill}
    />
    <path
      d="M5,14l11,-8l11,8l-11,8l-11,-8Zm3.4,-0c0,-0 7.6,5.527 7.6,5.527l7.6,-5.527c-0,-0 -7.6,-5.527 -7.6,-5.527l-7.6,5.527Z"
      fill={fill}
    />
  </>
);

const Measure: FC<BaseProps> = ({ fill }) => (
  <>
    <rect x="5" y="18" width="22" height="2" fill={fill} />
    <rect x="5" y="12" width="4" height="4" fill={fill} />
    <rect x="15" y="12" width="2" height="4" fill={fill} />
    <rect x="23" y="12" width="4" height="4" fill={fill} />
  </>
);

const Merge: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M4,4l0,24l10,0l0,-7l-2,0l0,5l-6,0l0,-9l4,0l0,2l5,-3l-5,-3l0,2l-4,0l0,-9l6,0l0,5l2,0l0,-7"
      fill={fill}
    />
    <path
      d="M28,28l0,-24l-10,-0l0,7l2,0l0,-5l6,-0l0,9l-4,0l0,-2l-5,3l5,3l0,-2l4,-0l-0,9l-6,0l0,-5l-2,0l0,7"
      fill={fill}
    />
  </>
);

const Minus: FC<BaseProps> = ({ fill }) => (
  <rect x="6" y="15" width="20" height="2" fill={fill} />
);

const Palette: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M27.918,14.417c-0,-0 0.143,1.977 -0.966,3.608c-1.395,2.052 -3.714,2.9 -5.819,2.786c-2.106,-0.114 -3.537,-1.172 -4.221,-0.026c-0.679,1.138 2.559,2.192 1.55,5.109c-0.812,2.346 -3.204,2.691 -6.792,1.132c-3.587,-1.559 -6.826,-4.531 -7.488,-8.841c-0.661,-4.311 0.338,-8.803 5.309,-12.315c4.971,-3.511 11.32,-0.979 11.32,-0.979c-0,-0 6.884,2.213 7.107,9.526Zm-1.999,0.06c-0.179,-5.893 -5.72,-7.682 -5.72,-7.682c-0.044,-0.014 -0.087,-0.03 -0.129,-0.047c0,0 -5.288,-2.166 -9.425,0.756c-4.191,2.96 -5.043,6.743 -4.486,10.377c0.551,3.593 3.319,6.012 6.309,7.311c1.135,0.493 2.111,0.778 2.925,0.785c0.576,0.004 0.997,-0.211 1.179,-0.736c0.259,-0.749 -0.215,-1.195 -0.52,-1.565c-0.406,-0.492 -0.758,-0.941 -0.949,-1.345l-0.22,-0.631l-0.065,-0.534l0.09,-0.734l0.287,-0.672l0.472,-0.614l0.645,-0.495l0.858,-0.322l1.094,-0.055c0.745,0.067 1.742,0.473 2.977,0.54c1.464,0.079 3.087,-0.487 4.058,-1.914c0.718,-1.057 0.624,-2.339 0.624,-2.339c-0.002,-0.028 -0.003,-0.056 -0.004,-0.084Z"
      fill={fill}
    />
    <circle cx="10.5" cy="12.5" r="1.5" fill={fill} />
    <circle cx="14.5" cy="9.5" r="1.5" fill={fill} />
    <circle cx="19.5" cy="10.5" r="1.5" fill={fill} />
    <circle cx="22.5" cy="14.5" r="1.5" fill={fill} />
  </>
);

const Polygon: FC<BaseProps> = ({ fill }) => (
  <>
    <g transform="matrix(0.992432,0.122794,-0.122794,0.992432,1.83428,-2.53401)">
      <path d="M14,11L10,15" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,0,-1)">
      <path d="M9,17L17.273,23.587" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,0,-1)">
      <path d="M19.864,22.927L23.109,15.137" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,0,-1)">
      <path d="M21.973,12.24L18.21,10.829" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,1,-1)">
      <circle cx="15" cy="10" r="2" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,-7,5)">
      <circle cx="15" cy="10" r="2" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,4,14)">
      <circle cx="15" cy="10" r="2" stroke={fill} strokeWidth="2px" />
    </g>
    <g transform="matrix(1,0,0,1,9,2)">
      <circle cx="15" cy="10" r="2" stroke={fill} strokeWidth="2px" />
    </g>
  </>
);

const RestoreWindow: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M17,15l-10,0l0,10l10,0l0,-10Zm-8,8l0,-6l6,0l0,6l-6,0Z"
      fill={fill}
    />
    <path d="M19,19l0,2l6,0l0,-14l-14,0l0,6l2,0l0,-4l10,0l0,10" fill={fill} />
  </>
);

const Save: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M21,4l7,7l0,17l-24,0l0,-24l17,-0Zm-0.828,2l-14.172,0l0,20c0,0 20,0 20,-0l-0,-14.172l-5.828,-5.828Z"
      fill={fill}
    />
    <rect x="8" y="8" width="9" height="2" fill={fill} />
    <circle cx="16" cy="20" r="3" fill={fill} />
    <path
      d="M16,17c1.656,0 3,1.344 3,3c0,1.656 -1.344,3 -3,3c-1.656,0 -3,-1.344 -3,-3c0,-1.656 1.344,-3 3,-3Zm0,2c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1Z"
      fill={fill}
    />
  </>
);

const Search: FC<BaseProps> = ({ fill }) => (
  <>
    <ellipse
      cx="13.919"
      cy="13.705"
      rx="7.919"
      ry="7.886"
      strokeWidth="2px"
      stroke={fill}
      fill="none"
    />
    <path
      d="M20.389,18.293l6.475,6.475l-1.414,1.414l-6.475,-6.475l1.414,-1.414Z"
      fill={fill}
    />
  </>
);

const Settings: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M16,10c3.312,0 6,2.689 6,6c0,3.311 -2.688,6 -6,6c-3.311,0 -6,-2.689 -6,-6c0,-3.311 2.689,-6 6,-6Zm0,2c-2.208,0 -4,1.792 -4,4c0,2.208 1.792,4 4,4c2.208,0 4,-1.792 4,-4c0,-2.208 -1.792,-4 -4,-4Z"
      fill={fill}
    />
    <path
      d="M19.554,4l0.568,2.888c0.669,0.303 1.298,0.677 1.878,1.114l2.892,-0.987l3.607,5.953l-2.539,2.137c0.027,0.295 0.04,0.593 0.04,0.895c-0,0.298 -0.013,0.594 -0.039,0.886l2.485,2.24l-3.429,5.816l-2.989,-0.965c-0.565,0.428 -1.177,0.797 -1.827,1.099l-0.632,2.924l-7.102,0l-0.602,-2.894c-0.664,-0.302 -1.289,-0.674 -1.865,-1.108l-2.927,0.979l-3.59,-5.921l2.555,-2.178c-0.025,-0.289 -0.038,-0.582 -0.038,-0.878c0,-0.295 0.013,-0.587 0.038,-0.875l-2.511,-2.232l3.554,-5.878l2.919,0.987c0.566,-0.426 1.179,-0.793 1.829,-1.092l0.575,-2.91c0.315,-0.03 6.827,0 7.15,0Zm-1.647,1.992c-1.171,-0.005 -2.728,-0.012 -3.855,-0.012l-0.459,2.32l-0.928,0.427c-0.52,0.239 -1.01,0.533 -1.463,0.873l-0.843,0.634c-0,-0 -2.397,-0.81 -2.397,-0.81l-1.863,3.08l2.018,1.794l-0.087,1c-0.02,0.231 -0.03,0.466 -0.03,0.702c0,0.237 0.01,0.472 0.031,0.705l0.089,1.027c0,-0 -2.045,1.742 -2.045,1.742l1.879,3.1l2.408,-0.805l0.84,0.631c0.461,0.346 0.961,0.644 1.491,0.886l0.923,0.42l0.477,2.294l3.862,0l0.502,-2.319l0.902,-0.419c0.52,-0.242 1.01,-0.537 1.462,-0.879l0.83,-0.629l2.457,0.793c-0,-0 1.785,-3.03 1.785,-3.03l-2.011,-1.814l0.087,-0.993c0.021,-0.234 0.031,-0.471 0.031,-0.71c0,-0.242 -0.011,-0.481 -0.032,-0.718l-0.092,-1.037l2.026,-1.705l-1.887,-3.113l-2.37,0.809l-0.846,-0.636c-0.465,-0.349 -0.968,-0.648 -1.503,-0.891l-0.938,-0.425l-0.451,-2.292Z"
      fill={fill}
    />
  </>
);

const Square: FC<BaseProps> = ({ fill }) => (
  <path
    id="square"
    d="M26,6l-20,0l0,20l20,0l0,-20Zm-18,18l0,-16l16,0l0,16l-16,0Z"
    fill={fill}
  />
);

const Transform: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M8,8l0,-4l2,0l0,18l18,0l0,2l-4,0l0,4l-2,0l0,-4l-14,0l0,-14l-4,0l0,-2l4,0Z"
      fill={fill}
    />
    <path d="M12,8l0,2l10,0l0,10l2,0l0,-12l-12,0Z" fill={fill} />
  </>
);

const Trash: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M6,8L6,10L8,10L8,28L24,28L24,10L26,10L26,8L6,8ZM10,26L10,10L22,10L22,26L10,26Z"
      fill={fill}
    />
    <rect x="10" y="4" width="12" height="2" fill={fill} />
  </>
);

const User: FC<BaseProps> = ({ fill }) => (
  <>
    <path
      d="M26,28l-2,0l0,-1c0,-4.298 -4,-6 -8,-6c-4,-0 -8,1.702 -8,6l0,1l-2,0l0,-1c0,-4.561 4,-8 10,-8c5,0 10,2.702 10,8l0,1Z"
      fill={fill}
    />
    <path
      d="M16,6c2.743,0 4,1 4,4c0,3 -1,5 -4,5c-3,0 -4,-2 -4,-5c0,-3 1,-4 4,-4Zm0,-2c-4,0 -6,2 -6,6c0,4 2,7 6,7c4,0 6,-3 6,-7c0,-4 -2,-6 -6,-6Z"
      fill={fill}
    />
  </>
);

const Warning: FC<BaseProps> = ({ fill }) => {
  const inverted =
    fill === "currentColor" ? "transparent" : isDark(fill) ? "#fff" : "#000";

  return (
    <>
      <path
        d="M16,3l-14.647,25l29.294,0l-14.647,-25Zm-1,8l2,0l0,9l-2,0l0,-9Zm1,14c-0.823,0 -1.5,-0.677 -1.5,-1.5c0,-0.823 0.677,-1.5 1.5,-1.5c0.823,0 1.5,0.677 1.5,1.5c0,0.823 -0.677,1.5 -1.5,1.5Z"
        fill={fill}
      />
      <path
        d="M16,25c-0.823,0 -1.5,-0.677 -1.5,-1.5c0,-0.823 0.677,-1.5 1.5,-1.5c0.823,0 1.5,0.677 1.5,1.5c0,0.823 -0.677,1.5 -1.5,1.5Zm-1,-5l2,0l0,-9l-2,0l0,9Z"
        fill={inverted}
      />
    </>
  );
};

export const Icon: FC<IconProps> = ({
  symbol,
  variant = "filled",
  size = "md",
  color = "currentColor",
  cursor,
  onClick,
}) => {
  const theme = useTheme() as Theme;
  const iconSize = theme.components?.icon?.size?.[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 32 32"
      style={{ flexShrink: 0 }}
      onClick={onClick}
      cursor={cursor}
    >
      {symbol === "add" && <Add fill={color} />}
      {symbol === "chevronUp" && <Chevron fill={color} $orientation="top" />}
      {symbol === "chevronRight" && (
        <Chevron fill={color} $orientation="right" />
      )}
      {symbol === "chevronDown" && (
        <Chevron fill={color} $orientation="bottom" />
      )}
      {symbol === "chevronLeft" && <Chevron fill={color} $orientation="left" />}
      {symbol === "circle" && <Circle fill={color} />}
      {symbol === "close" && <Close fill={color} />}
      {symbol === "cursor" && <Cursor fill={color} />}
      {symbol === "draw" && <Draw fill={color} />}
      {symbol === "edit" && <Edit fill={color} />}
      {symbol === "error" && <Error variant={variant} fill={color} />}
      {symbol === "export" && <Export fill={color} />}
      {symbol === "fullscreen" && <Fullscreen fill={color} />}
      {symbol === "label" && <Label fill={color} />}
      {symbol === "layers" && <Layers fill={color} />}
      {symbol === "list" && <List fill={color} />}
      {symbol === "location" && <Location fill={color} />}
      {symbol === "locationAdd" && <LocationAdd fill={color} />}
      {symbol === "measure" && <Measure fill={color} />}
      {symbol === "merge" && <Merge fill={color} />}
      {symbol === "minus" && <Minus fill={color} />}
      {symbol === "palette" && <Palette fill={color} />}
      {symbol === "polygon" && <Polygon fill={color} />}
      {symbol === "restoreWindow" && <RestoreWindow fill={color} />}
      {symbol === "save" && <Save fill={color} />}
      {symbol === "search" && <Search fill={color} />}
      {symbol === "settings" && <Settings fill={color} />}
      {symbol === "square" && <Square fill={color} />}
      {symbol === "transform" && <Transform fill={color} />}
      {symbol === "trash" && <Trash fill={color} />}
      {symbol === "user" && <User fill={color} />}
      {symbol === "warning" && <Warning variant={variant} fill={color} />}
    </svg>
  );
};
