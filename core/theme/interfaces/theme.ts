import { CSSObject } from "styled-components";
import { Button } from "./button";
import {
  Breakpoints,
  Color,
  Palette,
  Spacing,
  Surface,
  Typography,
} from "./common";

export interface Theme {
  breakpoints: Breakpoints;
  color: Color;
  palette: Palette;
  spacing: Spacing;
  surface: Surface;
  typography: Typography;
  components?: {
    button?: Button;
    layer?: {
      root?: CSSObject;
      level?: {
        1?: CSSObject;
        2?: CSSObject;
      };
    };
    input?: {
      root?: CSSObject;
      input?: CSSObject;
      icon?: CSSObject;
      text?: {
        label?: CSSObject;
        placeholder?: CSSObject;
        helper?: CSSObject;
        invalid?: CSSObject;
      };
      disabled?: {
        root?: CSSObject;
        label?: CSSObject;
        input?: CSSObject;
        icon?: CSSObject;
        helperText?: CSSObject;
        invalidText?: CSSObject;
      };
      size?: {
        sm?: CSSObject;
        md?: CSSObject;
        lg?: CSSObject;
      };
      variant?: {
        normal?: {
          root?: CSSObject;
          label?: CSSObject;
          input?: CSSObject;
          icon?: CSSObject;
          helperText?: CSSObject;
          invalidText?: CSSObject;
          disabled?: {
            root?: CSSObject;
            label?: CSSObject;
            input?: CSSObject;
            icon?: CSSObject;
            helperText?: CSSObject;
            invalidText?: CSSObject;
          };
        };
        fluid?: {
          root?: CSSObject;
          label?: CSSObject;
          input?: CSSObject;
          icon?: CSSObject;
          helperText?: CSSObject;
          invalidText?: CSSObject;
          disabled?: {
            root?: CSSObject;
            label?: CSSObject;
            input?: CSSObject;
            icon?: CSSObject;
            helperText?: CSSObject;
            invalidText?: CSSObject;
          };
        };
      };
    };
  };
}
