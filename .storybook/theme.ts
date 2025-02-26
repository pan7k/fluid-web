import { create } from "@storybook/theming/create";

const brand = {
  company: "Panik",
  product: "Fluid",
  logo: "fluid.svg",
  repository: "https://github.com/pan7k/fluid",
};

const common = {
  brandUrl: brand.repository,
  brandTarget: "_blank",
  fontBase: "Inter, sans-serif",
};

const light = create({
  brandTitle: `<a href="${brand.repository}" target="_blank" class="brand light"><img src="/${brand.logo}" width="30px" height="30px"/><div>${brand.company}<br><b>${brand.product}</b></div></a>`,
  base: "light",
  colorPrimary: "#000",
  colorSecondary: "#333",
  ...common,
});

const dark = create({
  brandTitle: `<a href="${brand.repository}" target="_blank" class="brand dark"><img src="/${brand.logo}" width="30px" height="30px"/><div>${brand.company}<br><b>${brand.product}</b></div></a>`,
  base: "dark",
  colorPrimary: "#fff",
  colorSecondary: "#4593ff",
  ...common,
});

export { light, dark };
