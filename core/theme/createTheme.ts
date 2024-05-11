import { defaultTheme as defaults } from "./defaultTheme";
import { Theme } from "./interfaces";

export const createTheme = (overrides?: Partial<Theme>): Theme => ({
  ...defaults,
  ...overrides,
  palette: {
    ...defaults.palette,
    ...overrides?.palette,
  },
  color: {
    ...defaults.color,
    ...overrides?.color,
  },
  surface: {
    ...defaults.surface,
    ...overrides?.surface,
  },
  typography: {
    ...defaults.typography,
    ...overrides?.typography,
    root: {
      ...defaults.typography.root,
      ...overrides?.typography?.root,
    },
    body: {
      ...defaults.typography.body,
      ...overrides?.typography?.body,
    },
    h1: {
      ...defaults.typography.h1,
      ...overrides?.typography?.h1,
    },
    h2: {
      ...defaults.typography.h2,
      ...overrides?.typography?.h2,
    },
    h3: {
      ...defaults.typography.h3,
      ...overrides?.typography?.h3,
    },
    h4: {
      ...defaults.typography.h4,
      ...overrides?.typography?.h4,
    },
    h5: {
      ...defaults.typography.h5,
      ...overrides?.typography?.h5,
    },
    h6: {
      ...defaults.typography.h6,
      ...overrides?.typography?.h6,
    },
  },
  spacing: overrides?.spacing || defaults.spacing,
  breakpoints: overrides?.breakpoints || defaults.breakpoints,
});
