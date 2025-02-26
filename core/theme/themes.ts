export interface ThemeDefinition {
  code: string;
  name: string;
  description?: string;
}

export const themes: ThemeDefinition[] = [
  {
    code: "fluid",
    name: "Fluid",
    description: "default",
  },
  {
    code: "idsk",
    name: "IDSK",
  },
];
