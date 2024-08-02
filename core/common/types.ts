// General
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

// Button
export type ButtonColor = "primary" | "secondary" | "success" | "danger";
export type ButtonVariant = "filled" | "outline" | "light" | "ghost";

// Text input
export type TextInputVariant = "normal" | "fluid";
export type TextInputSize = Omit<ComponentSize, "xs" | "xl">;

// Icon
export type IconVariant = "add";
