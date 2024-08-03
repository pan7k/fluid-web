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
import { Icon } from "./icon";
import { TextInput } from "./textInput";

export interface Theme {
  breakpoints: Breakpoints;
  color: Color;
  palette: Palette;
  spacing: Spacing;
  surface: Surface;
  typography: Typography;
  components?: {
    button?: Button;
    icon?: Icon;
    layer?: Layer;
    textInput?: TextInput;
  };
}
