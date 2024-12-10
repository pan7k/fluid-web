import {
  Breakpoints,
  Color,
  Palette,
  Spacing,
  Surface,
  Typography,
} from "./common";
import { CSSButton } from "./button";
import { CSSLayer } from "./layer";
import { CSSIcon } from "./icon";
import { CSSInput } from "./input";
import { CSSDivider } from "./divider";
import { CSSAccordion } from "./accordion";
import { CSSIconButton } from "./iconButton";
import { CSSTooltip } from "./tooltip";
import { CSSDialog } from "./dialog";
import { CSSMenu } from "./menu";
import { CSSChip } from "./chip";
import { CSSCheckbox } from "./checkbox";
import { CSSRadio } from "./radio";
import { CSSSwitch } from "./switch";

export interface Theme {
  breakpoints: Breakpoints;
  color: Color;
  palette: Palette;
  spacing: Spacing;
  surface: Surface;
  typography: Typography;
  components?: {
    accordion?: CSSAccordion;
    button?: CSSButton;
    checkbox?: CSSCheckbox;
    chip?: CSSChip;
    dialog?: CSSDialog;
    divider?: CSSDivider;
    icon?: CSSIcon;
    iconButton?: CSSIconButton;
    input?: CSSInput;
    layer?: CSSLayer;
    menu?: CSSMenu;
    radio?: CSSRadio;
    switch?: CSSSwitch;
    tooltip?: CSSTooltip;
  };
}
