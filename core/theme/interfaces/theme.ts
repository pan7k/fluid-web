import {
  Breakpoints,
  Color,
  Palette,
  Spacing,
  Surface,
  Typography,
} from "./common";
import { Button } from "./button";
import { Layer } from "./layer";
import { Input } from "./input";

export interface Theme {
  breakpoints: Breakpoints;
  color: Color;
  palette: Palette;
  spacing: Spacing;
  surface: Surface;
  typography: Typography;
  components?: {
    button?: Button;
    layer?: Layer;
    input?: Input;
  };
}
