import { CSSObject } from "styled-components";
import { Theme } from "./interfaces/theme";
import {
  Breakpoints,
  Color,
  Palette,
  Spacing,
  Surface,
  Typography,
} from "./interfaces/common";
import { colors } from "./colors";
import { createBreakpoints } from "./createBreakpoints";
import { createSpacing } from "./createSpacing";

const palette: Palette = {
  text: {
    primary: colors.black,
    secondary: colors.gray[80],
    inverted: colors.white,
  },
  primary: {
    main: colors.blue[70],
    10: colors.blue[80],
    20: colors.blue[90],
  },
  secondary: {
    main: colors.gray[80],
    10: colors.gray[90],
    20: colors.gray[100],
  },
  success: {
    main: colors.green[60],
    10: colors.green[70],
    20: colors.green[80],
  },
  danger: {
    main: colors.red[60],
    10: colors.red[70],
    20: colors.red[80],
  },
  warning: {
    main: colors.orange[60],
    10: colors.orange[70],
    20: colors.orange[80],
  },
  info: {
    main: colors.cyan[60],
    10: colors.cyan[70],
    20: colors.cyan[80],
  },
};

const color: Color = {
  blue: colors.blue[60],
  cyan: colors.cyan[50],
  green: colors.green[60],
  lime: colors.green[40],
  orange: colors.orange[60],
  yellow: colors.yellow[60],
  red: colors.red[60],
  magenta: colors.magenta[50],
  violet: colors.purple[50],
  purple: colors.purple[60],
};

const surface: Surface = {
  blank: colors.white,
  focus: colors.gray[80],
  10: colors.gray[10],
  20: colors.gray[20],
  30: colors.gray[30],
  40: colors.gray[40],
};

const typography: Typography = {
  root: {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  body: {
    fontSize: "0.875rem",
    lineHeight: "1.6",
  },
  h1: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: "1.2",
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500,
    lineHeight: "1.3",
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 500,
    lineHeight: "1.35",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "1.4",
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: "1.45",
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.5",
  },
};

const focus: CSSObject = {
  "&:focus": {
    outline: `2px solid ${colors.gray[80]}`,
    outlineOffset: "1px",
  },
};

const spacing: Spacing = createSpacing(4);

const breakpoints: Breakpoints = createBreakpoints({
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});

export const defaultTheme: Theme = {
  palette,
  color,
  surface,
  typography,
  spacing,
  breakpoints,
  components: {
    button: {
      root: {
        fontSize: typography.body.fontSize,
        display: "inline-flex",
        flexShrink: 0,
        justifyContent: "space-between",
        textAlign: "start",
        maxInlineSize: "20rem",
        position: "relative",
        cursor: "pointer",
        border: "1px solid",
        ...focus,
      },
      icon: {
        position: "absolute",
        insetInlineEnd: "1rem",
        flexShrink: 0,
      },
      variant: {
        filled: {
          root: {
            color: palette.text.inverted,
          },
          color: {
            primary: {
              background: palette.primary.main,
              borderColor: palette.primary.main,
              "&:hover": {
                background: palette.primary[10],
              },
              "&:active": {
                background: palette.primary[20],
              },
            },
            secondary: {
              background: palette.secondary.main,
              borderColor: palette.secondary.main,
              "&:hover": {
                background: palette.secondary[10],
              },
              "&:active": {
                background: palette.secondary[20],
              },
            },
            success: {
              background: palette.success.main,
              borderColor: palette.success.main,
              "&:hover": {
                background: palette.success[10],
              },
              "&:active": {
                background: palette.success[20],
              },
            },
            danger: {
              background: palette.danger.main,
              borderColor: palette.danger.main,
              "&:hover": {
                background: palette.danger[10],
              },
              "&:active": {
                background: palette.danger[20],
              },
            },
          },
        },
        outline: {
          root: {
            background: "transparent",
          },
          color: {
            primary: {
              borderColor: palette.primary.main,
              color: palette.primary.main,
              "&:hover": {
                color: surface.blank,
                background: palette.primary.main,
              },
              "&:active": {
                color: surface.blank,
                background: palette.primary[10],
              },
            },
            secondary: {
              borderColor: palette.secondary.main,
              color: palette.secondary.main,
              "&:hover": {
                color: surface.blank,
                background: palette.secondary.main,
              },
              "&:active": {
                color: surface.blank,
                background: palette.secondary[10],
              },
            },
            success: {
              borderColor: palette.success.main,
              color: palette.success.main,
              "&:hover": {
                color: surface.blank,
                background: palette.success.main,
              },
              "&:active": {
                color: surface.blank,
                background: palette.success[10],
              },
            },
            danger: {
              borderColor: palette.danger.main,
              color: palette.danger.main,
              "&:hover": {
                color: surface.blank,
                background: palette.danger.main,
              },
              "&:active": {
                color: surface.blank,
                background: palette.danger[10],
              },
            },
          },
        },
        light: {
          root: {
            background: surface[10],
            borderColor: "transparent",
          },
          color: {
            primary: {
              color: palette.primary.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.primary[20],
                background: surface[30],
              },
            },
            secondary: {
              color: palette.secondary.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.secondary[20],
                background: surface[30],
              },
            },
            success: {
              color: palette.success.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.success[20],
                background: surface[30],
              },
            },
            danger: {
              color: palette.danger.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.danger[20],
                background: surface[30],
              },
            },
          },
        },
        ghost: {
          root: {
            background: "transparent",
            borderColor: "transparent",
          },
          color: {
            primary: {
              color: palette.primary.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.primary[20],
                background: surface[20],
              },
            },
            secondary: {
              color: palette.secondary.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.secondary[20],
                background: surface[20],
              },
            },
            success: {
              color: palette.success.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.success[20],
                background: surface[20],
              },
            },
            danger: {
              color: palette.danger.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.danger[20],
                background: surface[20],
              },
            },
          },
        },
      },
      size: {
        xs: {
          padding: "6px 60px 6px 16px",
          minHeight: "2rem",
        },
        sm: {
          padding: "10px 60px 10px 16px",
          minHeight: "2.5rem",
        },
        md: {
          padding: "14px 60px 14px 16px",
          minHeight: "3rem",
        },
        lg: {
          padding: "14px 60px 14px 16px",
          minHeight: "4rem",
        },
        xl: {
          padding: "14px 60px 14px 16px",
          minHeight: "5rem",
        },
      },
    },
    icon: {
      size: {
        xs: 16,
        sm: 24,
        md: 32,
        lg: 40,
        xl: 48,
      },
    },
    layer: {
      root: {
        padding: spacing(2),
      },
      level: {
        1: {
          background: surface[10],
        },
        2: {
          background: surface[20],
        },
        last: {
          background: surface[30],
        },
      },
    },
  },
};
