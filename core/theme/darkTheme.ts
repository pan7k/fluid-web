import { CSSObject } from "styled-components";
import { Theme } from "./interfaces/theme";
import { Palette, Surface } from "./interfaces/common";
import { colors } from "./colors";
import { createTheme } from "./createTheme";

const palette: Palette = {
  text: {
    primary: colors.white,
    secondary: colors.gray[20],
    inverted: colors.black,
  },
  primary: {
    light: colors.blue[30],
    lighter: colors.blue[40],
    main: colors.blue[50],
    darker: colors.blue[60],
    dark: colors.blue[70],
  },
  secondary: {
    light: colors.gray[0],
    lighter: colors.gray[10],
    main: colors.gray[20],
    darker: colors.gray[30],
    dark: colors.gray[40],
  },
  success: {
    light: colors.green[20],
    lighter: colors.green[30],
    main: colors.green[40],
    darker: colors.green[50],
    dark: colors.green[60],
  },
  danger: {
    light: colors.red[20],
    lighter: colors.red[30],
    main: colors.red[40],
    darker: colors.red[50],
    dark: colors.red[60],
  },
  warning: {
    light: colors.orange[20],
    lighter: colors.orange[30],
    main: colors.orange[40],
    darker: colors.orange[50],
    dark: colors.orange[60],
  },
  info: {
    light: colors.cyan[20],
    lighter: colors.cyan[30],
    main: colors.cyan[40],
    darker: colors.cyan[50],
    dark: colors.cyan[60],
  },
};

const surface: Surface = {
  blank: colors.black,
  focus: colors.gray[20],
  10: colors.gray[100],
  20: colors.gray[90],
  30: colors.gray[80],
  40: colors.gray[70],
};

const focus: CSSObject = {
  "&:focus": {
    outline: `2px solid ${colors.gray[20]}`,
    outlineOffset: "1px",
  },
};

const focusWithin: CSSObject = {
  "&:focus-within": {
    outline: `2px solid ${colors.gray[20]}`,
    outlineOffset: "1px",
    borderBottom: "1px solid transparent",
  },
};

const focusInner: CSSObject = {
  "&:focus": {
    outline: `2px solid ${colors.gray[20]}`,
    outlineOffset: "-2px",
  },
};

export const darkTheme: Theme = createTheme({
  palette,
  surface,
  components: {
    accordion: {
      panel: {
        background: surface[10],
        "&:hover": {
          background: surface[20],
        },
        ...focus,
      },
      icon: {
        color: palette.text.secondary,
      },
      opened: {
        panel: {
          background: surface[20],
          "&:hover": {
            background: surface[30],
          },
        },
      },
    },
    button: {
      root: {
        ...focus,
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
    },
    checkbox: {
      root: {
        color: palette.text.primary,
      },
      input: {
        background: surface[10],
        border: `1px solid ${surface[30]}`,
        "&:checked": {
          background: palette.text.primary,
          borderColor: palette.text.primary,
          "&::after": {
            border: `solid ${palette.text.inverted}`,
          },
        },
        "&:indeterminate": {
          background: palette.text.primary,
          borderColor: palette.text.primary,
          "&::after": {
            border: `solid ${palette.text.inverted}`,
          },
        },
        "&:disabled": {
          background: surface[10],
          borderColor: surface[10],
        },
        ...focus,
      },
    },
    chip: {
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
          root: {
            background: surface[20],
          },
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
          background: surface[20],
        },
        second: {
          background: surface[30],
        },
      },
    },
    dialog: {
      root: {
        background: surface[10],
      },
      header: {
        root: {
          background: surface[10],
        },
        label: {
          color: palette.text.primary,
        },
        buttons: {
          "& > :focus": {
            ...focusInner,
          },
        },
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
      panel: {
        "& > :focus": {
          ...focusInner,
        },
      },
    },
    divider: {
      border: `1px solid ${surface[40]}`,
    },
    iconButton: {
      root: {
        ...focus,
      },
    },
    layer: {
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
      icon: {
        adornment: {
          color: palette.text.secondary,
        },
      },
      input: {
        color: palette.text.primary,
      },
      text: {
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
          stack: {
            background: surface[10],
            borderBottom: `1px solid ${surface[20]}`,
            ...focusWithin,
          },
        },
        fluid: {
          root: {
            background: surface[10],
            borderBottom: `1px solid ${surface[20]}`,
            ...focusWithin,
          },
        },
      },
      state: {
        disabled: {
          text: {
            root: {
              color: colors.gray[70],
            },
          },
          stack: {
            background: "#111",
          },
          icon: {
            adornment: {
              color: colors.gray[60],
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
        outline: `2px solid ${surface.focus}`,
        background: surface.blank,
      },
      item: {
        background: surface.blank,
        "&:hover": {
          background: surface[20],
        },
      },
    },
    radio: {
      root: {
        color: palette.text.secondary,
      },
      stack: {
        color: palette.text.primary,
      },
      input: {
        background: surface[10],
        border: `1px solid ${surface[30]}`,
        "&:checked": {
          "&::after": {
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
        color: palette.text.primary,
      },
      stack: {
        background: surface[10],
        border: `1px solid ${surface[30]}`,
        ...focusWithin,
      },
      knob: {
        background: palette.text.primary,
      },
      checked: {
        stack: {
          background: palette.success.main,
          border: `1px solid ${palette.success.main}`,
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
        background: palette.secondary.main,
        color: palette.text.inverted,
      },
    },
  },
});
