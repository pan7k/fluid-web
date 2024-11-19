export const isDark = (fill: string, element?: HTMLElement) => {
  let hex = "";
  let r = 0;
  let g = 0;
  let b = 0;

  if (fill.startsWith("#")) {
    // hex
    hex = fill.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (fill.startsWith("rgb")) {
    // rgb or rgba
    const match = fill.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      r = parseInt(match[1], 10);
      g = parseInt(match[2], 10);
      b = parseInt(match[3], 10);
    }
  } else {
    // html
    const html = {
      red: "#ff0000",
      green: "#00ff00",
      blue: "#0000ff",
      orange: "#ffa500",
      purple: "#800080",
      teal: "#008080",
      yellow: "#ffff00",
      grey: "#808080",
      cyan: "#00ffff",
      magenta: "#ff00ff",
      white: "#ffffff",
      black: "#000000",
    };
    const key = fill.toLowerCase() as keyof typeof html;
    hex = html[key];
    if (hex) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

export const colors = {
  red: {
    100: "#3b090b",
    90: "#65050a",
    80: "#8a1117",
    70: "#b52621",
    60: "#e22e2f",
    50: "#fc5c64",
    40: "#ff8c8f",
    30: "#ffc1c4",
    20: "#ffe2e4",
    10: "#fff5f5",
  },
  magenta: {
    100: "#3a0d20",
    90: "#62042e",
    80: "#870d42",
    70: "#b22462",
    60: "#e0327a",
    50: "#ff5a9b",
    40: "#ff8eb9",
    30: "#ffbfd8",
    20: "#ffe3ef",
    10: "#fff4f8",
  },
  orange: {
    100: "#452400",
    90: "#663200",
    80: "#8b4500",
    70: "#b06000",
    60: "#f18701",
    50: "#f4a021",
    40: "#f6b64d",
    30: "#f9ce7a",
    20: "#fbdeb0",
    10: "#fef0e7",
  },
  yellow: {
    100: "#3f2d00",
    90: "#634d00",
    80: "#8c7000",
    70: "#b59100",
    60: "#f4d02b",
    50: "#f7da50",
    40: "#f9e37a",
    30: "#fbeaa5",
    20: "#fcf2cf",
    10: "#fef9e7",
  },
  purple: {
    100: "#2a103c",
    90: "#42176a",
    80: "#5c208c",
    70: "#7d32c7",
    60: "#9e42ff",
    50: "#b769ff",
    40: "#d09bff",
    30: "#e1c1ff",
    20: "#f0e0ff",
    10: "#f9f4ff",
  },
  blue: {
    100: "#001849",
    90: "#002879",
    80: "#003aad",
    70: "#0051e1",
    60: "#0f73ff",
    50: "#4593ff",
    40: "#78b1ff",
    30: "#a6d0ff",
    20: "#d0e9ff",
    10: "#edf7ff",
  },
  cyan: {
    100: "#08203b",
    90: "#023056",
    80: "#00427c",
    70: "#0058a8",
    60: "#0079d6",
    50: "#119cfb",
    40: "#33c0ff",
    30: "#82e2ff",
    20: "#baf3ff",
    10: "#e5fcff",
  },
  teal: {
    100: "#092227",
    90: "#03333e",
    80: "#004d56",
    70: "#006b6e",
    60: "#008c8b",
    50: "#00afaa",
    40: "#0cd3ce",
    30: "#40e8e6",
    20: "#a5fcfc",
    10: "#e0ffff",
  },
  green: {
    100: "#08220b",
    90: "#033511",
    80: "#064c1a",
    70: "#12712e",
    60: "#1a8f41",
    50: "#26b255",
    40: "#4cd06f",
    30: "#76e492",
    20: "#b1f7c0",
    10: "#e5ffea",
  },
  gray: {
    100: "#1a1a1a",
    90: "#2a2a2a",
    80: "#424242",
    70: "#5c5c5c",
    60: "#757575",
    50: "#919191",
    40: "#adadad",
    30: "#c8c8c8",
    20: "#e2e2e2",
    10: "#f5f5f5",
    0: "#fafafa",
  },
  white: "#fff",
  black: "#000",
};
