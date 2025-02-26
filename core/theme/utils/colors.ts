export const isDark = (fill: string) => {
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
