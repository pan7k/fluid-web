import { CSS } from "../common/types";

interface Button {
  button?: CSS;
  stack?: CSS;
  label?: CSS;
  icon?: CSS;
}

interface IconButton {
  button?: CSS;
  stack?: CSS;
  icon?: CSS;
  tooltip?: CSS;
}

interface MenuButton {
  stack?: CSS;
  button?: Button;
  iconButton?: IconButton;
  menuList?: CSS;
}

interface Accordion {
  stack?: CSS;
  accordion?: CSS;
  icon?: CSS;
  content?: CSS;
}

interface Dialog {
  overlay?: CSS;
  dialog?: CSS;
  header?: CSS;
  label?: CSS;
  buttons?: CSS;
  iconButton?: IconButton;
  layer?: CSS;
  stack?: CSS;
  content?: CSS;
  actions?: CSS;
}

interface DialogPanel {
  dialogPanel?: CSS;
  button?: Button;
}

interface Tooltip {
  tooltip?: CSS;
  container?: CSS;
}

interface Checkbox {
  checkbox?: CSS;
  input?: CSS;
}

interface Radio {
  radio?: CSS;
  label?: CSS;
  stack?: CSS;
  input?: CSS;
  text?: CSS;
}

interface Switch {
  switch?: CSS;
  stack?: CSS;
  input?: CSS;
  knob?: CSS;
}

interface Navigation {
  navigation?: CSS;
  list?: CSS;
  item?: CSS;
}

interface NavigationItem {
  navigationItem?: CSS;
  label?: CSS;
  icon?: CSS;
}

interface Slider {
  slider?: CSS;
  track?: CSS;
  fill?: CSS;
  thumb?: CSS;
}

interface ColorPicker {
  colorPicker?: CSS;
  trigger?: CSS;
  swatch?: CSS;
  dropdown?: CSS;
  grid?: CSS;
  option?: CSS;
  hue?: CSS;
  alpha?: CSS;
  controls?: CSS;
  value?: CSS;
  info?: CSS;
  optionSelected?: CSS;
  saturation?: CSS;
  saturationPointer?: CSS;
}

interface Loader {
  loader?: CSS;
  spinner?: CSS;
  overlay?: CSS;
}

interface Message {
  message?: CSS;
  icon?: CSS;
  content?: CSS;
  close?: CSS;
}

interface Snackbar {
  snackbar?: CSS;
}

interface DataGrid {
  datagrid?: CSS;
  container?: CSS;
  table?: CSS;
  header?: CSS;
  body?: CSS;
  cell?: CSS;
  row?: CSS;
  pagination?: CSS;
}

interface Drawer {
  drawer?: CSS;
  overlay?: CSS;
  content?: CSS;
  header?: CSS;
  label?: CSS;
  body?: CSS;
  footer?: CSS;
}
export interface Theme {
  button?: Button;
  iconButton?: IconButton;
  menuButton?: MenuButton;
  accordion?: Accordion;
  dialog?: Dialog;
  dialogPanel?: DialogPanel;
  tooltip?: Tooltip;
  checkbox?: Checkbox;
  radio?: Radio;
  switch?: Switch;
  navigation?: Navigation;
  navigationItem?: NavigationItem;
  slider?: Slider;
  colorPicker?: ColorPicker;
  loader?: Loader;
  message?: Message;
  snackbar?: Snackbar;
  datagrid?: DataGrid;
  drawer?: Drawer;
}
