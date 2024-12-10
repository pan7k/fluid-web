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
import { ComponentSize } from "../common/types";

const padding = (size?: ComponentSize, offset?: "withOffset" | undefined) => {
  const right = offset === "withOffset" ? "60px" : "16px";

  const sizes = {
    xs: `6px ${right} 6px 16px`,
    sm: `10px ${right} 10px 16px`,
    md: `14px ${right} 14px 16px`,
    lg: `14px ${right} 14px 16px`,
    xl: `14px ${right} 14px 16px`,
  };

  return {
    padding: sizes[size || "md"],
  };
};

const spacing: Spacing = createSpacing(4);

const breakpoints: Breakpoints = createBreakpoints({
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});

const palette: Palette = {
  text: {
    primary: colors.black,
    secondary: colors.gray[60],
    inverted: colors.white,
  },
  primary: {
    light: colors.blue[50],
    lighter: colors.blue[60],
    main: colors.blue[70],
    darker: colors.blue[80],
    dark: colors.blue[90],
  },
  secondary: {
    light: colors.gray[60],
    lighter: colors.gray[70],
    main: colors.gray[80],
    darker: colors.gray[90],
    dark: colors.gray[100],
  },
  success: {
    light: colors.green[40],
    lighter: colors.green[50],
    main: colors.green[60],
    darker: colors.green[70],
    dark: colors.green[80],
  },
  danger: {
    light: colors.red[40],
    lighter: colors.red[50],
    main: colors.red[60],
    darker: colors.red[70],
    dark: colors.red[80],
  },
  warning: {
    light: colors.orange[40],
    lighter: colors.orange[50],
    main: colors.orange[60],
    darker: colors.orange[70],
    dark: colors.orange[80],
  },
  info: {
    light: colors.cyan[40],
    lighter: colors.cyan[50],
    main: colors.cyan[60],
    darker: colors.cyan[70],
    dark: colors.cyan[80],
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
  caption: {
    fontSize: "0.75rem",
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

const focusWithin: CSSObject = {
  "&:focus-within": {
    outline: `2px solid ${colors.gray[80]}`,
    outlineOffset: "1px",
    borderBottom: "1px solid transparent",
  },
};

const focusInner: CSSObject = {
  "&:focus": {
    outline: `2px solid ${colors.gray[80]}`,
    outlineOffset: "-2px",
  },
};

const userSelect: CSSObject = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
};

export const defaultTheme: Theme = {
  palette,
  color,
  surface,
  typography,
  spacing,
  breakpoints,
  components: {
    accordion: {
      panel: {
        position: "relative",
        display: "flex",
        flexShrink: 0,
        justifyContent: "space-between",
        textAlign: "start",
        cursor: "pointer",
        background: surface[10],
        "&:hover": {
          background: surface[20],
        },
        ...focus,
        ...userSelect,
      },
      icon: {
        position: "absolute",
        insetInlineEnd: "1rem",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        height: "22px",
        color: palette.text.secondary,
      },
      content: {
        display: "none",
        height: "100%",
        maxHeight: 0,
        overflowY: "auto",
      },
      opened: {
        panel: {
          background: surface[20],
          "&:hover": {
            background: surface[30],
          },
        },
        content: {
          display: "block",
          maxHeight: 800,
          overflowY: "visible",
          marginTop: "2px",
        },
      },
      size: {
        xs: padding("xs", "withOffset"),
        sm: padding("sm", "withOffset"),
        md: padding("md", "withOffset"),
      },
    },
    checkbox: {
      root: {
        fontFamily: typography.root.fontFamily,
        fontSize: typography.body.fontSize,
        color: palette.text.primary,
        display: "inline-flex",
        gap: spacing(2),
        cursor: "pointer",
        alignItems: "center",
        width: "fit-content",
        ...userSelect,
      },
      input: {
        cursor: "pointer",
        height: "18px",
        width: "18px",
        background: surface[10],
        border: `1px solid ${surface[30]}`,
        display: "inline-block",
        position: "relative",
        appearance: "none",
        margin: 0,
        "&:checked": {
          background: palette.text.primary,
          borderColor: palette.text.primary,
          "&::after": {
            content: '""',
            position: "absolute",
            left: "5px",
            top: "1px",
            width: "4px",
            height: "10px",
            border: `solid ${palette.text.inverted}`,
            borderWidth: "0 2px 2px 0",
            transform: "rotate(45deg)",
          },
        },
        "&:indeterminate": {
          background: palette.text.primary,
          borderColor: palette.text.primary,
          "&::after": {
            content: '""',
            position: "absolute",
            left: "2px",
            top: "7px",
            width: "10px",
            height: "0px",
            border: `solid ${palette.text.inverted}`,
            borderWidth: "0 2px 2px 0",
          },
        },
        "&:disabled": {
          background: surface[10],
          borderColor: surface[10],
        },
        ...focus,
      },
    },
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
        border: "1px solid transparent",
        alignSelf: "flex-start",
        ...focus,
        ...userSelect,
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
              "&:hover": {
                background: palette.primary.darker,
              },
              "&:active": {
                background: palette.primary.dark,
              },
            },
            secondary: {
              background: palette.secondary.main,
              "&:hover": {
                background: palette.secondary.darker,
              },
              "&:active": {
                background: palette.secondary.dark,
              },
            },
            success: {
              background: palette.success.main,
              "&:hover": {
                background: palette.success.darker,
              },
              "&:active": {
                background: palette.success.dark,
              },
            },
            danger: {
              background: palette.danger.main,
              "&:hover": {
                background: palette.danger.darker,
              },
              "&:active": {
                background: palette.danger.dark,
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
                background: palette.primary.darker,
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
                background: palette.secondary.darker,
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
                background: palette.success.darker,
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
                background: palette.danger.darker,
              },
            },
          },
        },
        light: {
          root: {
            background: surface[10],
          },
          color: {
            primary: {
              color: palette.primary.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.primary.dark,
                background: surface[30],
              },
            },
            secondary: {
              color: palette.secondary.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.secondary.dark,
                background: surface[30],
              },
            },
            success: {
              color: palette.success.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.success.dark,
                background: surface[30],
              },
            },
            danger: {
              color: palette.danger.main,
              "&:hover": {
                background: surface[20],
              },
              "&:active": {
                color: palette.danger.dark,
                background: surface[30],
              },
            },
          },
        },
        ghost: {
          root: {
            background: "transparent",
          },
          color: {
            primary: {
              color: palette.primary.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.primary.dark,
                background: surface[20],
              },
            },
            secondary: {
              color: palette.secondary.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.secondary.dark,
                background: surface[20],
              },
            },
            success: {
              color: palette.success.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.success.dark,
                background: surface[20],
              },
            },
            danger: {
              color: palette.danger.main,
              "&:hover": {
                background: surface[10],
              },
              "&:active": {
                color: palette.danger.dark,
                background: surface[20],
              },
            },
          },
        },
      },
      size: {
        xs: {
          ...padding("xs", "withOffset"),
          minHeight: "2rem",
        },
        sm: {
          ...padding("sm", "withOffset"),
          minHeight: "2.5rem",
        },
        md: {
          ...padding("md", "withOffset"),
          minHeight: "3rem",
        },
        lg: {
          ...padding("lg", "withOffset"),
          minHeight: "4rem",
        },
        xl: {
          ...padding("xl", "withOffset"),
          minHeight: "5rem",
        },
      },
      disabled: {
        background: surface[10],
        color: colors.gray[30],
        border: "none",
      },
    },
    chip: {
      root: {
        display: "flex",
        alignItems: "center",
        background: surface[10],
        gap: "4px",
        width: "fit-content",
        fontFamily: typography.root.fontFamily,
        cursor: "default",
        ...userSelect,
      },
      variant: {
        filled: {
          root: {
            color: palette.text.inverted,
          },
          color: {
            primary: {
              background: palette.primary.main,
            },
            secondary: {
              background: palette.secondary.main,
            },
            success: {
              background: palette.success.main,
            },
            danger: {
              background: palette.danger.main,
            },
            warning: {
              background: palette.warning.main,
            },
            info: {
              background: palette.info.main,
            },
          },
        },
        light: {
          color: {
            primary: {
              color: palette.primary.main,
            },
            secondary: {
              color: palette.secondary.main,
            },
            success: {
              color: palette.success.main,
            },
            danger: {
              color: palette.danger.main,
            },
            warning: {
              color: palette.warning.main,
            },
            info: {
              color: palette.info.main,
            },
          },
        },
      },
      layer: {
        first: {
          background: surface.blank,
        },
        second: {
          background: surface[10],
        },
      },
      size: {
        xs: {
          fontSize: typography.caption.fontSize,
          padding: "2px 4px",
        },
        sm: {
          fontSize: typography.caption.fontSize,
          padding: "4px 6px",
        },
        md: {
          fontSize: typography.body.fontSize,
          padding: "4px 6px",
        },
        lg: {
          fontSize: typography.body.fontSize,
          padding: "6px 10px",
        },
      },
    },
    dialog: {
      root: {
        position: "fixed",
        minWidth: "320px",
        minHeight: "150px",
        maxWidth: "100vw",
        maxHeight: "100vh",
        background: surface[10],
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      },
      header: {
        root: {
          zIndex: 1000,
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          gap: spacing(2),
          background: surface[10],
          position: "sticky",
          minHeight: "48px",
          marginBottom: "3px",
          top: 0,
          ...userSelect,
        },
        label: {
          marginLeft: spacing(4),
          marginTop: spacing(3),
          marginBottom: spacing(3),
          alignSelf: "center",
          fontFamily: typography.root.fontFamily,
          fontSize: typography.h6.fontSize,
          fontWeight: typography.h6.fontWeight,
          color: palette.text.primary,
        },
        buttons: {
          position: "relative",
          display: "flex",
          "& > :focus": {
            ...focusInner,
          },
        },
      },
      content: {
        flexGrow: 1,
      },
      actions: {
        display: "flex",
        paddingTop: 0,
        paddingBottom: 0,
        gap: spacing(4),
      },
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
      panel: {
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "1px",
        "& > :focus": {
          ...focusInner,
        },
        ...userSelect,
      },
    },
    divider: {
      padding: 0,
      margin: 0,
      border: `1px solid ${surface[40]}`,
    },
    icon: {
      size: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 30,
        xl: 40,
      },
    },
    iconButton: {
      root: {
        cursor: "pointer",
        border: "1px solid transparent",
        ...focus,
        ...userSelect,
      },
      icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      },
      size: {
        xs: {
          padding: "7px",
        },
        sm: {
          padding: "11px",
        },
        md: {
          padding: "15px",
        },
      },
      disabled: {
        background: surface[10],
        color: colors.gray[30],
        border: "none",
      },
    },
    layer: {
      root: {
        marginTop: spacing(4),
        padding: spacing(4),
      },
      level: {
        1: {
          background: surface[10],
        },
        2: {
          background: surface.blank,
        },
      },
    },
    input: {
      root: {
        fontFamily: typography.root.fontFamily,
        ...userSelect,
      },
      input: {
        fontSize: typography.body.fontSize,
        border: "none",
        outline: "none",
        background: "none",
      },
      icon: {
        adornment: {
          color: palette.text.secondary,
        },
      },
      stack: {
        width: "auto",
        justifyContent: "space-between",
        gap: spacing(1),
      },
      text: {
        root: {
          cursor: "default",
          fontSize: typography.caption.fontSize,
        },
        label: {
          color: palette.text.secondary,
        },
        description: {
          color: palette.text.secondary,
        },
        warning: {
          color: palette.warning.darker,
        },
        invalid: {
          color: palette.danger.darker,
        },
      },
      variant: {
        normal: {
          root: {
            display: "flex",
            flexDirection: "column",
            gap: spacing(2),
          },
          stack: {
            display: "flex",
            alignItems: "center",
            padding: "8px 10px",
            background: surface[10],
            borderBottom: `1px solid ${surface[20]}`,
            ...focusWithin,
          },
        },
        fluid: {
          root: {
            display: "inline-flex",
            alignSelf: "center",
            flexDirection: "column",
            background: surface[10],
            borderBottom: `1px solid ${surface[20]}`,
            ...focusWithin,
          },
          stack: {
            display: "flex",
            flexDirection: "row",
          },
          input: {
            marginLeft: "-1px",
          },
          size: {
            xs: {
              text: {
                label: {
                  padding: "2px 10px 0px 10px",
                },
              },
              stack: {
                padding: "0px 10px",
              },
            },
            sm: {
              text: {
                label: {
                  padding: "4px 10px 0px 10px",
                },
              },
              stack: {
                padding: "0px 10px 2px 10px",
              },
            },
            md: {
              text: {
                label: {
                  padding: "6px 10px 0px 10px",
                },
              },
              stack: {
                padding: "0px 10px 0px 10px",
              },
            },
            lg: {
              text: {
                label: {
                  padding: "6px 10px 4px 10px",
                },
              },
              stack: {
                padding: "0px 10px 4px 10px",
              },
            },
          },
        },
      },
      size: {
        xs: {
          text: {
            root: {
              fontSize: "0.65rem",
            },
            label: {
              fontSize: "0.65rem",
            },
          },
          stack: {
            padding: "4px 10px",
          },
          input: {
            height: "18px",
            fontSize: "0.75rem",
          },
        },
        sm: {
          stack: {
            padding: "6px 10px",
          },
        },
        md: {
          input: {
            height: "24px",
          },
        },
        lg: {
          text: {
            root: {
              fontSize: "0.8rem",
            },
            label: {
              fontSize: "0.8rem",
            },
          },
          input: {
            height: "32px",
            fontSize: "1rem",
          },
        },
      },
      state: {
        disabled: {
          text: {
            root: {
              color: colors.gray[30],
            },
          },
          stack: {
            background: colors.gray[0],
          },
          icon: {
            adornment: {
              color: colors.gray[30],
            },
          },
        },
      },
      layer: {
        first: {
          stack: {
            background: surface.blank,
          },
        },
        second: {
          stack: {
            background: surface[10],
          },
        },
      },
    },
    menu: {
      list: {
        zIndex: 1000,
        position: "fixed",
        outline: `2px solid ${surface.focus}`,
        margin: "2px",
        padding: "1px",
        background: surface.blank,
        maxHeight: "200px",
        overflowY: "auto",
        ...userSelect,
      },
      item: {
        padding: "8px 14px",
        cursor: "pointer",
        background: surface.blank,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing(4),
        "&:hover": {
          background: surface[10],
        },
      },
    },
    radio: {
      root: {
        fontFamily: typography.root.fontFamily,
        fontSize: typography.caption.fontSize,
        color: palette.text.secondary,
        display: "inline-flex",
        flexDirection: "column",
        gap: spacing(3),
        width: "fit-content",
        cursor: "default",
        ...userSelect,
      },
      stack: {
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        color: palette.text.primary,
        fontSize: typography.body.fontSize,
        gap: spacing(2),
      },
      input: {
        height: "18px",
        width: "18px",
        background: surface[10],
        border: `1px solid ${surface[30]}`,
        display: "inline-block",
        position: "relative",
        appearance: "none",
        margin: 0,
        borderRadius: "50%",
        cursor: "pointer",
        "&:checked": {
          "&::after": {
            content: '""',
            position: "absolute",
            left: "3px",
            top: "3px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: palette.text.primary,
          },
        },
        "&:disabled": {
          borderColor: surface[10],
          "&:checked": {
            "&::after": {
              background: surface[40],
            },
          },
        },
        ...focus,
      },
    },
    switch: {
      root: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "fit-content",
        cursor: "pointer",
        fontFamily: typography.root.fontFamily,
        fontSize: typography.body.fontSize,
        color: palette.text.primary,
        ...userSelect,
      },
      stack: {
        position: "relative",
        width: "38px",
        height: "22px",
        borderRadius: "12px",
        transition: "background 0.3s ease",
        background: surface[10],
        border: `1px solid ${surface[30]}`,
        ...focusWithin,
      },
      knob: {
        position: "absolute",
        top: "2px",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: palette.text.primary,
        transition: "left 0.3s ease",
        left: "2px",
      },
      input: {
        opacity: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        cursor: "pointer",
      },
      checked: {
        stack: {
          background: palette.success.light,
          border: `1px solid ${palette.success.light}`,
        },
        knob: {
          left: "18px",
        },
      },
      disabled: {
        stack: {
          background: surface[10],
          border: `1px solid ${surface[30]}`,
        },
        knob: {
          background: surface[30],
        },
      },
    },
    tooltip: {
      root: {
        zIndex: 1000,
        position: "fixed",
        background: palette.secondary.main,
        color: palette.text.inverted,
        textAlign: "center",
        alignItems: "center",
        fontFamily: typography.root.fontFamily,
        ...userSelect,
      },
      size: {
        sm: {
          fontSize: "0.7rem",
          padding: "4px 6px",
        },
        md: {
          fontSize: "0.8rem",
          padding: "6px 8px",
        },
        lg: {
          fontSize: "0.875rem",
          padding: "8px 10px",
        },
      },
    },
  },
};
