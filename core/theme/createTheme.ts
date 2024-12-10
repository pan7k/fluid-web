import { defaultTheme as defaults } from "./defaultTheme";
import { Theme } from "./interfaces/theme";

const mergeDeep = (target: any, source: any): any => {
  if (
    typeof target !== "object" ||
    target === null ||
    typeof source !== "object" ||
    source === null
  ) {
    return source;
  }

  const output = { ...target };

  Object.keys(source).forEach((key) => {
    if (typeof source[key] === "object" && source[key] !== null) {
      output[key] = mergeDeep(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });

  return output;
};

export const createTheme = (overrides?: Partial<Theme>): Theme =>
  mergeDeep(defaults, overrides);
